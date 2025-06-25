<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Projects</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Projects</h1>

        @if (session('success'))
            <div class="bg-green-500 text-white p-4 rounded mb-4">
                {{ session('success') }}
            </div>
        @endif

        <!-- Add Project Form -->
        <div class="bg-white p-6 rounded shadow-md mb-8">
            <h2 class="text-xl font-bold mb-4">Add New Project</h2>
            <form action="{{ route('admin.projects.store') }}" method="POST">
                @csrf
                <div class="mb-4">
                    <label for="name" class="block text-gray-700">Name</label>
                    <input type="text" name="name" id="name" class="w-full p-2 border border-gray-300 rounded" required>
                </div>
                <div class="mb-4">
                    <label for="url" class="block text-gray-700">URL</label>
                    <input type="url" name="url" id="url" class="w-full p-2 border border-gray-300 rounded" required>
                </div>
                <div class="mb-4">
                    <label for="description" class="block text-gray-700">Description</label>
                    <textarea name="description" id="description" class="w-full p-2 border border-gray-300 rounded"
                        required></textarea>
                </div>
                <div class="mb-4">
                    <label for="techstack" class="block text-gray-700">Tech Stack</label>
                    <input type="text" name="techstack" id="techstack" class="w-full p-2 border border-gray-300 rounded"
                        required>
                </div>
                <div class="mb-4">
                    <label for="deployment" class="block text-gray-700">Deployment</label>
                    <input type="text" name="deployment" id="deployment"
                        class="w-full p-2 border border-gray-300 rounded" required>
                </div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Project</button>
            </form>
        </div>

        <!-- Existing Projects Table -->
        <table class="min-w-full bg-white">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">ID</th>
                    <th class="py-2 px-4 border-b">Name</th>
                    <th class="py-2 px-4 border-b">Description</th>
                    <th class="py-2 px-4 border-b">Tech Stack</th>
                    <th class="py-2 px-4 border-b">Deployment</th>
                    <th class="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($projects as $project)
                    <tr>
                        <td class="py-2 px-4 border-b">{{ $project->id }}</td>
                        <td class="py-2 px-4 border-b">{{ $project->name }}</td>
                        <td class="py-2 px-4 border-b">{{ $project->description }}</td>
                        <td class="py-2 px-4 border-b">{{ $project->techstack }}</td>
                        <td class="py-2 px-4 border-b">{{ $project->deployment }}</td>
                        <td class="py-2 px-4 border-b">
                            <form action="{{ route('admin.projects.destroy', $project->id) }}" method="POST" class="inline-block">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            </form>
                            <a href="{{ route('admin.projects.edit', $project->id) }}"
                                class="bg-green-500 text-white px-4 py-2 rounded ml-2">Edit</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
