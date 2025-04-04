<script>
	import { enhance } from '$app/forms';
	let { data } = $props();
	let showComments = $state(false);

	function showTheComments() {
		showComments = !showComments;
	}
	let likeStatus = $state({});
	function toggleLike(articleId) {
		likeStatus[articleId] = likeStatus[articleId] === "instagram-heart-png-23855.png" ? "white.png" : "instagram-heart-png-23855.png";
	}
	
	function countComments(articleId) {
		return data.comments.filter((comment) => comment.article_id === articleId).length;
	}

	function countLikes(articleId) {
		const articleLikes = data.likes.find((like) => like.id === articleId);
		return articleLikes ? articleLikes.votes : 0;
	}

</script>
<style>
	
	/* Layout adjustment to account for the fixed left sidebar */
	.layout {
		display: flex;
		flex-direction: column;
		padding-left: 0; 
		padding-right: 0;/* Default for small screens */
	}

	@media (min-width: 1024px) { /* Adjust content for large screens */
		.layout {
			display: grid;
			grid-template-columns: 1fr 350px; /* Main content + Sidebar */
			gap: 2rem;
			padding-left: 270px; /* Accounts for the fixed sidebar width */
		}
	}

	.main-content {
		margin-left: auto;
		margin-right: auto;
		max-width: 630px;
		width: 100%;
	}

	.sidebar {
		display: none;
	}

	@media (min-width: 1280px) {
		.sidebar {
			display: block;
			position: sticky;
			top: 30px;
			right: 0;
			height: fit-content;
		}
	}
	

	
</style>

<div class="bg-black min-h-screen layout p-4 lg:p-8">
	<!-- Main Content Section -->
	<section class="main-content">
		{#each data.articles as article}
		<div class="bg-black p-4  mx-auto max-w-screen-sm md:border">
			<!-- Article Header -->
			<div class="mb-4 flex flex-row items-center gap-3">
				<div class="h-11 w-11 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
					<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-white">
						<img class="h-full w-full object-cover" src="Eriseldi.jpg" alt="Eriseldi" />
					</div>
				</div>
				<p class="text-sm font-semibold text-white">{article.author}</p>
			</div>

			<!-- Article Image -->
			<div>
				<img class="w-full h-full rounded-lg object-cover" src={article.image} alt="" />
			</div>

			
				
			
			<!-- Article Footer -->
			<div class="space-y-1 pt-4 pb-2 text-sm">
				<div class="flex items-center space-x-2">
					<form action="?/toggleLike" method="POST" use:enhance>
					<input type="hidden" name="articleId" value={article.id}>
					<button type="submit" onclick={() => toggleLike(article.id)}>
						<img src={likeStatus[article.id] || "white.png"} alt="Like" class="w-8 h-8 cursor-pointer" />
					</button>
				    </form>
					<p class="font-semibold text-white"> {countLikes(article.id)} likes</p>
				</div>
			
				<div>
					<p class="text-white">
						<span class="font-semibold">{article.author}</span> {article.description}
					</p>
				</div>
				<div>
					<button class="text-gray-500 focus:outline-none" onclick={showTheComments}>
						{#if showComments}
							Hide comments
						{:else}
							View all {countComments(article.id)} comments
						{/if}
					</button>
				</div>

				{#if showComments}
					{#each data.comments.filter((comment) => comment.article_id === article.id) as comment (comment.id)}
					<div class="mt-2 flex items-center space-x-2">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<img class="h-6 w-6 rounded-full object-cover" src={article.image} alt={comment.name} />
						</div>
						<p class="text-sm text-white">
							<span class="font-semibold">{comment.name}</span> {comment.text}
						</p>
					</div>
					{/each}
				{/if}

				<form action="?/addComment" method="POST" use:enhance class="pt-3">
					<input type="hidden" name="article_id" value={article.id}/>
					<input type="hidden" name="name" value={article.author}/>
					<div class="flex justify-between">
						<input 
							type="text" 
							name="commentInput" 
							placeholder="Add a comment..." 
						  class="w-[80%] bg-transparent p-0  border-none text-sm text-gray-400 focus:outline-none "
							required
						/>
						<button type="submit" class="font-semibold text-blue-400 hover:text-blue-300">Post</button>
					</div>
				</form>

				<div class="pt-2">
					<a href="api/articles/{article.id}" class="text-xs text-gray-500 hover:text-gray-300">read more</a>
				</div>
			</div>
		</div>
		{/each}
	</section>
	<!-- Right Sidebar Section (Only visible on large screens) -->
	<div class="space-y-3">

	<aside class="sidebar hidden xl:block m-7">
		<div class="py-3 flex items-center justify-between">
			<div class=" flex items-center space-x-3">
				<img 
					class="w-[60px] h-[60px] rounded-full object-cover" 
					src="https://avatars.githubusercontent.com/u/26464462?v=4" 
					alt="Profile"
					loading="lazy"
				/>
				<div>
					<p class="text-white font-semibold">andrecanuto</p>
					<p class="text-gray-400 text-sm">André Cabral</p>
				</div>
			</div>
			<button class="text-blue-500 text-sm font-semibold hover:text-blue-400">Switch</button>
		</div>

		<div class="py-3">
			<div class="flex justify-between items-center">
				<span class="text-gray-400 font-semibold">Suggestions for you</span>
				<button class="text-white text-sm font-semibold hover:text-gray-300">See All</button>
			</div>
		</div>
		<div class="flex items-center justify-between mb-4 ">
			<div class="flex items-center space-x-3">
				<img 
					class="w-8 h-8 rounded-full object-cover" 
					src="https://randomuser.me/api/portraits/men/1.jpg" 
					alt="Suggested user"
					loading="lazy"
				/>
				<div>
					<p class="text-white text-sm">user_1</p>
					<p class="text-gray-400 text-xs">Followed by user_a + 3</p>
				</div>
			</div>
			<button class="text-blue-500 text-xs font-semibold hover:text-blue-400">Follow</button>
		</div>
		
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center space-x-3">
				<img 
					class="w-8 h-8 rounded-full object-cover" 
					src="https://randomuser.me/api/portraits/women/2.jpg" 
					alt="Suggested user"
					loading="lazy"
				/>
				<div>
					<p class="text-white text-sm">user_2</p>
					<p class="text-gray-400 text-xs">Suggested for you</p>
				</div>
			</div>
			<button class="text-blue-500 text-xs font-semibold hover:text-blue-400">Follow</button>
		</div>
		
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center space-x-3">
				<img 
					class="w-8 h-8 rounded-full object-cover" 
					src="https://randomuser.me/api/portraits/men/3.jpg" 
					alt="Suggested user"
					loading="lazy"
				/>
				<div>
					<p class="text-white text-sm">user_3</p>
					<p class="text-gray-400 text-xs">Followed by user_a + 3</p>
				</div>
			</div>
			<button class="text-blue-500 text-xs font-semibold hover:text-blue-400">Follow</button>
		</div>
		
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center space-x-3">
				<img 
					class="w-8 h-8 rounded-full object-cover" 
					src="https://randomuser.me/api/portraits/women/4.jpg" 
					alt="Suggested user"
					loading="lazy"
				/>
				<div>
					<p class="text-white text-sm">user_4</p>
					<p class="text-gray-400 text-xs">Suggested for you</p>
				</div>
			</div>
			<button class="text-blue-500 text-xs font-semibold hover:text-blue-400">Follow</button>
		</div>
		
		<div class="flex items-center justify-between mb-4">
			<div class="flex items-center space-x-3">
				<img 
					class="w-8 h-8 rounded-full object-cover" 
					src="https://randomuser.me/api/portraits/men/5.jpg" 
					alt="Suggested user"
					loading="lazy"
				/>
				<div>
					<p class="text-white text-sm">user_5</p>
					<p class="text-gray-400 text-xs">Followed by user_a + 3</p>
				</div>
			</div>
			<button class="text-blue-500 text-xs font-semibold hover:text-blue-400">Follow</button>
		</div>
		

		
	</aside>
</div>
</div>
