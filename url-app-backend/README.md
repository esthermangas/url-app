## Getting Started

First, up the docker containers needed:

```bash
docker compose up -d
```
If you don't have docker in your device visit  [https://www.docker.com/](https://www.docker.com/)



Then, add the .env in the root of the application. Add the variables you have in the .env.example

Install the dependencies:

```bash
composer install
```

Execute the migrations to add the tables in your database:

```bash
php artisan migrate
```

Finally, start the application:

```bash
php artisan serve
```
