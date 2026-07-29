# Stage 1: Install PHP Dependencies with Composer
FROM php:8.4-cli-alpine AS composer_base

RUN apk add --no-cache \
    zip unzip git libpng-dev libjpeg-turbo-dev \
    libwebp-dev libzip-dev oniguruma-dev icu-dev postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql mbstring gd intl zip

WORKDIR /app

COPY composer.json composer.lock ./
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts
COPY . .

# Run dump-autoload with --no-scripts to prevent package:discover from failing
RUN composer dump-autoload --optimize --no-scripts

# Stage 2: Build Frontend & SSR Assets with Node
FROM node:20-alpine AS frontend
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source code AND vendor folder so Ziggy imports work cleanly
COPY . .
COPY --from=composer_base /app/vendor ./vendor

# Build client assets and SSR bundle
RUN npm run build


# Stage 3: Final Production Image
FROM php:8.4-fpm-alpine AS backend

RUN apk add --no-cache \
    nginx curl zip unzip git libpng-dev libjpeg-turbo-dev \
    libwebp-dev libxpm-dev libzip-dev freetype-dev \
    oniguruma-dev icu-dev bash shadow postgresql-dev \
    supervisor nodejs

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd intl zip

WORKDIR /var/www/html

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

COPY . .
COPY --from=composer_base /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build
COPY --from=frontend /app/bootstrap/ssr ./bootstrap/ssr

RUN mkdir -p bootstrap/cache storage/framework/views storage/framework/sessions storage/framework/cache \
    && chmod -R 775 bootstrap/cache storage \
    && chown -R www-data:www-data bootstrap/cache storage /var/www/html

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]