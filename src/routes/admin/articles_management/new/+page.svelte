<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';

	let { form } = $props();
</script>

<main class="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-3xl font-bold text-gray-800">Upload an Image</h1>

		<form
			action="?/upload"
			method="POST"
			class="space-y-4"
			use:enhance
			enctype="multipart/form-data"
		>
			<!-- File Upload Input -->
			<label class="block">
				<span class="text-gray-700 font-medium">Choose an Image:</span>
				<input
					type="file"
					name="image"
					class="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:ring focus:ring-blue-300"
				/>
			</label>

			<!-- Description Input -->
			<label class="block">
				<span class="text-gray-700 font-medium">Description:</span>
				<input
					type="text"
					name="description"
					placeholder="Write a short description..."
					class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
				/>
			</label>

			<!-- Author Input -->
			<label class="block">
				<span class="text-gray-700 font-medium">Author:</span>
				<input
					type="text"
					name="author"
					placeholder="Your name..."
					class="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
				/>
			</label>

			<!-- Submit Button -->
			<button
				type="submit"
				class="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
			>
				Upload my Image
			</button>
		</form>

		<!-- Uploaded Image Preview -->
		{#if form}
			<div class="mt-6 flex flex-col items-center">
				<p class="text-gray-700 font-medium">Uploaded Image:</p>
				<img
					src={form.uploaded}
					alt="Uploaded"
					class="mt-2 h-auto max-w-full rounded-lg border border-gray-300 shadow-md"
				/>
			</div>
		{/if}
	</div>
</main>
