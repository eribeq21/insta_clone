<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>

<section class="flex-1 lg:ml-[220px]">
	<!-- Main Content -->
	<div class="mx-auto flex-grow bg-black p-6 text-white shadow-lg">
		<div class="mb-6 text-center">
			<h1 class="text-xl font-semibold text-pink-300 mb-2">All Posts</h1>
			<a
				href="/admin/articles_management/new"
				class="text-sm text-gray-500 hover:text-gray-400 transition-colors"
			>
				Upload a new post
			</a>
		</div>
		
		

		<div class="space-y-4">
			{#each data.articles as article (article.id)}
				<div
					class="flex transform rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg transition-transform hover:scale-105"
					transition:slide
				>
					<!-- Image Section -->
					<div class="mr-4 flex-shrink-0">
						<img
							src={article.image}
							alt=""
							class="h-24 w-24 rounded-lg border border-zinc-700 object-cover shadow-md"
							loading="lazy"
						/>
					</div>

					<!-- Details Section -->
					<div class="flex-grow">
						<p class="mt-1 text-xs text-gray-500">Article ID: {article.id}</p>
						<p class="mt-1 text-xl font-semibold text-white">{article.author}</p>
						<p class="mt-2 text-base leading-relaxed text-gray-300">{article.description}</p>
					</div>

						


					<!-- Delete Button -->
					<form
						action="?/deleteArticle"
						method="POST"
						use:enhance
						class="flex items-center justify-end"
					>
						<input type="hidden" name="id" value={article.id} />
						<button
							type="submit"
							class="rounded-lg bg-red-600 px-4 py-2 font-bold text-white shadow-md transition-all duration-200 hover:bg-red-700"
							>Delete</button
						>
					</form>
				</div>
			{/each}
		</div>
	</div>
</section>
