FROM php:8.3-apache
WORKDIR /var/www/html

# Mise à jour et installation des outils
RUN apt-get update && apt-get install -y \
    git \
    vim \
    nano \
    curl \
    telnet \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip mysqli pdo pdo_mysql

# --- INSTALLATION DE COMPOSER ---
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

# --- INSTALLATION DE PHPMAILER ---
# On installe PHPMailer via Composer
RUN composer require phpmailer/phpmailer

# --- CONFIGURATION PHP ET APACHE ---
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
RUN cp db/db_connect.php.docker db/db_connect.php
RUN a2enmod rewrite

RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf