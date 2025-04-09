<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>

<section class="flex-1 lg:ml-[220px]">
	<div class="mx-auto flex-grow bg-black p-6 text-white shadow-lg min-h-screen">
		<!-- Header -->
		<div class="mb-6 text-center">
			<h1 class="text-xl font-semibold text-pink-300 mb-2">All Posts</h1>
			<a
				href="/admin/articles_management/new"
				class="text-sm text-gray-500 hover:text-gray-400 transition-colors"
			>
				Upload a new post
			</a>
		</div>

		<!-- Grid Layout -->
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{#each data.articles as article (article.id)}
				<div
					class="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
					transition:slide
				>
					<!-- Image -->
					<img
						src={article.image}
						alt="Post image"
						class="w-full h-48 object-cover"
						loading="lazy"
					/>

					<!-- Content -->
					<div class="p-4">
						<p class="text-xs text-gray-500 mb-1">ID: {article.id}</p>
						<p class="text-lg font-semibold text-white mb-1">{article.author}</p>
						<p class="text-sm text-gray-300 mb-4">{article.description}</p>

						<!-- Delete Form -->
						<form
							action="?/deleteArticle"
							method="POST"
							use:enhance
							class="text-right"
						>
							<input type="hidden" name="id" value={article.id} />
							<button
								type="submit"
								class="text-xs bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded-full shadow-sm transition-all duration-200"
							>
								Delete
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>