FROM php:8.4-fpm

# Устанавливаем системные зависимости и расширения
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxml2-dev \
    zlib1g-dev \
    curl \
    supervisor \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install intl pdo_mysql mbstring zip gd opcache \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Открываем порт для встроенного PHP сервера
EXPOSE 8000

# Создаем рабочую директорию
WORKDIR /var/www/html

# Копируем проект
COPY . .

# Создаем временную директорию /tmp с правильными правами
RUN chmod 1777 /tmp

# Устанавливаем зависимости PHP
RUN composer install --optimize-autoloader

# Команда запуска встроенного сервера PHP
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
