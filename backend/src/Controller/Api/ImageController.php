<?php
namespace App\Controller\Api;

use Imagine\Image\Palette\RGB;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Filesystem\Filesystem;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use Imagine\Image\Point;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api/images', name: 'api_images_')]
class ImageController extends AbstractController
{
    const string PUBLIC_DIR = __DIR__ . '/../../../public';
    private string $imageDir = self::PUBLIC_DIR . '/uploads';
    private string $fontDir = self::PUBLIC_DIR . '/fonts/Roboto-Regular.ttf';

    public function __construct(private readonly HttpClientInterface $client)
    {
        $fs = new Filesystem();
        if (!$fs->exists($this->imageDir)) {
            $fs->mkdir($this->imageDir, 0755);
        }
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $baseUrl = $request->getSchemeAndHttpHost(); //"http://localhost:8000"

        $files = array_map(
            fn($f) => $baseUrl . '/uploads/' . basename($f),
            glob($this->imageDir . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE)
        );

        return $this->json(['images' => $files]);
    }

    #[Route('', name: 'upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $baseUrl = $request->getSchemeAndHttpHost(); //"http://localhost:8000"

        $data = json_decode($request->getContent(), true);
        $url = $data['url'] ?? '';
        $minWidth = (int) ($data['minWidth'] ?? 200);
        $minHeight = (int) ($data['minHeight'] ?? 200);
        $overlayText = $data['overlayText'] ?? '';

        if (!$url) {
            return $this->json(['error' => 'URL is required'], 400);
        }

        // Получаем HTML страницы
        $response = $this->client->request('GET', $url);
        $html = $response->getContent();

        // Находим все img src (простая регулярка, для примера)
        preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);
        $images = $matches[1] ?? [];

        $imagine = new Imagine();

        foreach ($images as $imgUrl) {
            $imageUrlValid = $imgUrl;

            if (parse_url($imgUrl, PHP_URL_SCHEME) === null) {
                $imageUrlValid = rtrim($url, '/') . '/' . ltrim($imgUrl, '/');
            }

            try {
                $content = $this->client->request('GET', $imageUrlValid)->getContent();
                $tmpFile = tempnam(sys_get_temp_dir(), 'img');
                file_put_contents($tmpFile, $content);

                $image = $imagine->open($tmpFile);
                $size = $image->getSize();

                if ($size->getWidth() < $minWidth || $size->getHeight() < $minHeight) {
                    continue; // Пропускаем маленькие картинки
                }

                // Обрезаем до квадрата 200x200
                $image->resize(new Box(200, 200));

                // Добавляем текст
                if ($overlayText) {
                    $palette = new RGB();
                    $color = $palette->color('#ffffff');
                    $font = new \Imagine\Gd\Font($this->fontDir, 14, $color);

                    $image->draw()->text($overlayText, $font, new Point(10, 90));
                }

                $filename = uniqid('img_') . '.jpg';
                $image->save($this->imageDir . '/' . $filename);

                unlink($tmpFile);
            } catch (\Exception $e) {
                continue;
            }
        }

        $files = array_map(
            fn($f) => $baseUrl . '/uploads/' . basename($f),
            glob($this->imageDir . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE)
        );

        return $this->json(['images' => $files]);
    }
}
