<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @vite('resources/css/app.css')
    @inertiaHead
    <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto:wght@400;700&display=swap"
        rel="stylesheet">
    <style>
        :root {
            --background-image-url: url('{{ asset('images/background.jpeg') }}');
        }
    </style>

</head>

<body>
    @inertia
</body>

</html>