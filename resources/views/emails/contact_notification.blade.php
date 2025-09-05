<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Contact Submission</title>
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
            font-size: 24px;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .label {
            font-weight: bold;
            color: #b6c9b6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <p><span class="label">Name:</span> {{ $data['name'] }}</p>
        <p><span class="label">Email:</span> {{ $data['email'] }}</p>
        <p><span class="label">Message:</span><br>{{ $data['message'] }}</p>
    </div>
</body>
</html>
