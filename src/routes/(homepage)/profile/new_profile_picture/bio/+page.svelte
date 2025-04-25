<script>
	import { enhance } from '$app/forms';
	import { updated } from '$app/state';
	import { upload } from '@vercel/blob/client';

	let { form, data } = $props();
	let user = data.user; 	// Extract the logged-in user info

</script>
<!-- Page layout with a centered container -->
<main class="flex h-screen items-center justify-center bg-black p-6 lg:ml-[220px]">
	<div class="w-full max-w-md rounded-2xl bg-gray-100 p-[2px] shadow-xl">
		<div class="h-full w-full rounded-2xl border border-gray-100 bg-black p-8">
			<h1 class="mb-6 text-center text-3xl font-bold text-white">BIO</h1>
			<!-- Form to upload a bio -->
			<form action="?/bio_upload" method="POST" class="space-y-4" use:enhance>
				<!-- Bio input field -->
				<label class="block">
					<span class="font-medium text-gray-300">Write down a bio:</span>
					<input
						type="text"
						name="bio_text"
						class="mt-2 block w-full cursor-pointer rounded-lg border border-gray-600 bg-black px-4 py-2 text-gray-300 shadow-sm transition-all file:mr-4 file:border-0 file:bg-gray-600 file:px-4 file:py-2 file:text-white file:hover:bg-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
					/>
				</label>

				<!-- Hidden input to pass the user ID -->
				<input type="hidden" name="user_id" value={user.id} />
				<!-- Submit Button -->
				<button
					type="submit"
					class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					Post
				</button>
			</form>

			<!-- Uploaded Image Preview -->
			{#if form}
				<div class="mt-6 flex flex-col items-center">
					<p class="font-medium text-green-400">Bio successfully created</p>
				</div>
			{/if}
		</div>
	</div>
</main>
