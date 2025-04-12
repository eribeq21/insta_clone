<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
	let article = data.article;
	let user = data.user;
	let users = data.users;

	let showComments = $state(false);
	let likeStatus = $state({});

	function showTheComments() {
		showComments = !showComments;
	}

	function toggleLike(articleId) {
		const current = isLiked(articleId);
		likeStatus[articleId] = !current;
	}

	function isLiked(articleId) {
		if (likeStatus[articleId] !== undefined) return likeStatus[articleId];
		return data.userLikes.includes(articleId);
	}

	function countComments(articleId) {
		return data.comments.filter((c) => c.article_id === articleId).length;
	}

	function countLikes(articleId) {
		const found = data.likes.find((like) => like.id === articleId);
		return found ? found.votes : 0;
	}
</script>

<section class="main-content flex-1 lg:ml-[245px]">
	<div class="mx-auto flex max-w-screen-lg flex-col bg-black p-4 md:flex-row md:border">
		<!-- Article Image -->
		<div class="md:w-1/2 md:pr-4">
			<img class="h-full w-full rounded-lg object-cover" src={data.article.image} alt="" />
		</div>

		<!-- Article Content -->
		<div class="md:w-1/2 md:pl-4">
			<!-- Article Header -->
			<div class="mb-4 flex flex-row items-center gap-3">
				<div
					class="h-11 w-11 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5"
				>
					<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-white">
						<img
							class="h-full w-full object-cover"
							src={article.profile_picture}
							alt={data.article.author}
						/>
					</div>
				</div>
				<p class="text-sm font-semibold text-white">{data.article.author}</p>
			</div>

			<!-- Article Footer -->
			<div class="space-y-1 pt-4 pb-2 text-sm">
				<div class="flex items-center space-x-2">
					<form action="?/toggleLike" method="POST" use:enhance>
						<input type="hidden" name="articleId" value={data.article.id} />
						<button type="submit" onclick={() => toggleLike(data.article.id)}>
							<img
								src={isLiked(data.article.id) ? '/instagram-heart-png-23855.png' : '/white.png'}
								alt="Like"
								class="h-8 w-8 cursor-pointer"
							/>
						</button>
					</form>
					<p class="font-semibold text-white">{countLikes(data.article.id)} likes</p>
				</div>

				<div>
					<p class="text-white">
						<span class="font-semibold">{data.article.author}</span>
						{data.article.description}
					</p>
				</div>
				<div>
					<button class="cursor-pointer text-gray-500 focus:outline-none" onclick={showTheComments}>
						{#if showComments}
							Hide comments
						{:else}
							View all {countComments(data.article.id)} comments
						{/if}
					</button>
				</div>

				{#if showComments}
					{#each data.comments.filter((comment) => comment.article_id === article.id) as comment (comment.id)}
						<div class="mt-2 flex items-center space-x-2">
							<div
								class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5"
							>
								{#each data.users as user}
									{#if user.username === comment.name}
										<img
											class="h-6 w-6 rounded-full object-cover"
											src={user.profile_picture}
											alt={comment.name}
											loading="lazy"
										/>
									{/if}
								{/each}
							</div>
							<p class="text-sm text-white">
								<span class="font-semibold">{comment.name}</span>
								{comment.text}
							</p>
						</div>
					{/each}
				{/if}

				<form action="?/addComment" method="POST" use:enhance class="pt-3">
					<input type="hidden" name="article_id" value={article.id} />
					<input type="hidden" name="name" value={user.username} />
					<div class="flex justify-between">
						<input
							type="text"
							name="commentInput"
							placeholder="Add a comment..."
							class="w-[80%] border-none bg-transparent p-0 text-sm text-gray-400 focus:outline-none"
							required
						/>
						<button type="submit" class="font-semibold text-blue-400 hover:text-blue-300"
							>Post</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
