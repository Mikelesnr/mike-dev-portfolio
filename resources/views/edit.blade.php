<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Project</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Edit Project</h1>
        <div class="bg-white p-6 rounded shadow-md">
            <form action="{{ route('admin.projects.update', $project->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-4">
                    <label for="name" class="block text-gray-700">Name</label>
                    <input type="text" name="name" id="name" class="w-full p-2 border border-gray-300 rounded"
                        value="{{ $project->name }}" required>
                </div>
                <div class="mb-4">
                    <label for="url" class="block text-gray-700">URL</label>
                    <input type="url" name="url" id="url" class="w-full p-2 border border-gray-300 rounded"
                        value="{{ $project->url }}" required>
                </div>
                <div class="mb-4">
                    <label for="description" class="block text-gray-700">Description</label>
                    <textarea name="description" id="description" class="w-full p-2 border border-gray-300 rounded"
                        required>{{ $project->description }}</textarea>
                </div>
                <div class="mb-4">
                    <label for="techstack" class="block text-gray-700">Tech Stack</label>
                    <input type="text" name="techstack" id="techstack" class="w-full p-2 border border-gray-300 rounded"
                        value="{{ $project->techstack }}" required>
                </div>
                <div class="mb-4">
                    <label for="deployment" class="block text-gray-700">Deployment</label>
                    <input type="text" name="deployment" id="deployment"
                        class="w-full p-2 border border-gray-300 rounded" value="{{ $project->deployment }}" required>
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update Project</button>
            </form>
        </div>
    </div>
</body>

</html>
