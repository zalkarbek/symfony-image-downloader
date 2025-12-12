FROM node:jod

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Экспонируем порт dev-сервера Vite
EXPOSE 5173
