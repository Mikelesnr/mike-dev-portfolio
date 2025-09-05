<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Thank You</title>
    <style>
        body {
            font-family: 'Merriweather', serif;
            background-color: #0b1b18;
            color: rgb(195, 230, 221);
            padding: 40px;
        }
        .container {
            background-color: #1f2f2b;
            padding: 30px;
            border-radius: 20px;
        }
        h2 {
            color: #d9ee60;
            font-size: 28px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello {{ $data['name'] }},</h2>
        <p>Thank you for contacting me through my developer portfolio. I appreciate your message and will respond as soon as I see it.</p>
        <p>Warm regards,<br>Michael Ngonidzashe Mwanza</p>
    </div>
</body>
</html>
