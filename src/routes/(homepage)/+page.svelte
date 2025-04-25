<script>
	import { enhance } from '$app/forms';
	let { data } = $props();// Access props passed from server
	let user = data.user; 	// Store current user data


	// ===============================
	// COMMENT TOGGLING STATE & LOGIC
	// ===============================


	let showComments = $state({});		// Object that tracks visibility of comments per article ID
    
	// Toggle comments display for a given article ID
	function showTheComments(articleId) {
		showComments[articleId] = !showComments[articleId]; // Toggle comments
	}


	// ====================================
	// LIKE SYSTEM STATE & HELPER FUNCTIONS
	// ====================================


	let likeStatus = $state({}); 	// Local state that stores if the current user liked each article

	// Triggered on like button click: toggles like state locally
	function toggleLike(articleId) {
		const current = isLiked(articleId);
		likeStatus[articleId] = !current;
	}

	// Determines whether the current article is liked
	function isLiked(articleId) {
		// If the user has toggled it manually
		if (likeStatus[articleId] !== undefined) {
			return likeStatus[articleId];
		}

		// Fall back to server-provided list of liked article IDs
		for (let i = 0; i < data.userLikes.length; i++) {
			if (data.userLikes[i] === articleId) {
				return true; // Article is liked according to the backend
			}
		}
        
		return false; // Default: not liked

	}

	// Count how many comments belong to a specific article
	function countComments(articleId) {
		// Filter all comments that match the article ID
		return data.comments.filter((comment) => comment.article_id === articleId).length;
	}
	// Retrieve the total number of likes for a specific article
	function countLikes(articleId) {
		const articleLikes = data.likes.find((like) => like.id === articleId);
		return articleLikes ? articleLikes.votes : 0;
	}


	// =======================
	// USER PROFILE + FOLLOWERS
	// =======================


	// Build the profile link from the username
	function getAuthorProfileLink(authorName) {
		const user = data.users.find((user) => user.username === authorName);
		if (user) {
			// If user found, return their profile URL
			return `api/profile/${user.username}`; // Making sure this points to the correct route
		} else {
			// If not found, fallback
			return '#';
		}
	}

	// Show/hide full list of users in sidebar
	let seeAllusers = $state(false);

	function seeAll() {
		seeAllusers = !seeAllusers;
	}

	// Count how many people follow a given user
	function getFollowerCount(userId) {
		return data.follows.filter((f) => f.following_id === userId).length;
	}
</script>

<!-- Layout container for the entire page (uses Flexbox for responsive layout) -->
<div class="layout min-h-screen bg-black p-4 lg:p-8">
	<!-- Main Content Section -->
	<section class="main-content">
		<!-- Article Card: Loops through all articles and displays details -->
		{#each data.articles as article}
			<div class="mx-auto max-w-screen-sm bg-black p-4 md:border">
				<!-- Article Header: Contains the article author and profile picture -->
				<div class="mb-4 flex flex-row items-center gap-3">
					<div
						class="h-11 w-11 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5"
					>
						<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-white">

							<img
								class="h-full w-full object-cover"
								src={article.profile_picture}
								alt={article.author}
								loading="lazy"
							/>
						</div>
					</div>
					<!-- Conditionally render the author profile link -->
					{#if data.user.username === article.author}
						<a href="/profile">
							<p class="text-sm font-semibold text-white">{article.author}</p>
						</a>
					{:else}
						<a href={getAuthorProfileLink(article.author)}>
							<p class="text-sm font-semibold text-white">{article.author}</p>
						</a>
					{/if}

					<!-- Show an Admin icon if the author is an admin -->

					{#if article.role === 'admin'}
						<img src="/admin.png" alt="Admin" class="h-4 w-4" />
					{/if}
				</div>

				<!-- Article Image Section -->
				<div>
					<img class="h-full w-full rounded-lg object-cover" src={article.image} alt="" />
				</div>

				<!-- Article Footer: Contains like button, comment section, and description -->
				<div class="space-y-1 pt-4 pb-2 text-sm">
					<!-- Like section with form submission for liking the article -->
					<div class="flex items-center space-x-2">
						<form action="?/toggleLike" method="POST" use:enhance>
							<input type="hidden" name="articleId" value={article.id} />
							<button type="submit" onclick={() => toggleLike(article.id)}>
								<img
									src={isLiked(article.id) ? 'instagram-heart-png-23855.png' : 'white.png'}
									alt="Like"
									class="h-8 w-8 cursor-pointer"
									loading="lazy"
								/>
							</button>
						</form>
						<p class="font-semibold text-white">{countLikes(article.id)} likes</p>
					</div>

					<!-- Article description with author name  -->
					<div>
						<p class="text-white">
							<span class="font-semibold">{article.author}</span>
							{article.description}
						</p>
					</div>
					<!-- Button to toggle the comment visibility -->

					<div>
						<button
							class="cursor-pointer text-gray-500 focus:outline-none"
							onclick={() => showTheComments(article.id)}
						>
							{#if showComments[article.id]}
								Hide comments
							{:else}
								View all {countComments(article.id)} comments
							{/if}
						</button>
					</div>

					<!-- Conditional block for displaying comments under the article -->

					{#if showComments[article.id]}
						{#each data.comments.filter((comment) => comment.article_id === article.id) as comment (comment.id)}
							<div class="mt-2 flex items-center space-x-2">
								<!-- Display user profile picture for each comment -->

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
								<!-- Display the comment with user name and text -->
								<p class="text-sm text-white">
									<span class="font-semibold">{comment.name}</span>
									{comment.text}
								</p>
							</div>
						{/each}
					{/if}

					<!-- Comment input form -->
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

					<!-- Link to the individual article -->
					<div class="pt-2">
						<a href="api/articles/{article.id}" class="text-xs text-gray-500 hover:text-gray-300"
							>read more</a
						>
					</div>
				</div>
			</div>
		{/each}
	</section>

	<!-- Right Sidebar Section (Only visible on large screens) -->
	<div class="space-y-3">
		<aside class="sidebar m-7 hidden max-h-[90vh] overflow-y-auto pr-2 xl:block">
			<!-- Sidebar Heading and Toggle Button -->
			<div class="py-3">
				<div class="flex items-center justify-between">
					<span class="font-semibold text-gray-400">Suggestions for you</span>
					<button class="text-sm font-semibold text-white hover:text-gray-300" onclick={seeAll}>
						{#if seeAllusers}
							Show less
						{:else}
							See all
						{/if}
					</button>
				</div>
			</div>
			<!-- Display Suggested Users -->
			{#if seeAllusers === false}
				{#each data.users.slice(0, 5) as user}
					{#if user.username !== data.user.username}
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<img
									class="h-8 w-8 rounded-full object-cover"
									src={user.profile_picture}
									alt="Suggested user"
									loading="lazy"
								/>
								<div>
									<div class="flex items-center space-x-1">
										<a href={`api/profile/${user.username}`}>
											<p class="text-sm text-white">{user.username}</p>
										</a>
										<!-- Admin badge -->
										{#if user.role === 'admin'}
											<img src="/admin.png" alt="Admin" class="h-4 w-4" />
										{/if}
									</div>
									<!-- Followers count or message -->
									{#if getFollowerCount(user.id) === 0}
										<p class="text-xs text-gray-400">No followers yet</p>
									{:else}
										<p class="text-xs text-gray-400">
											Followed by {getFollowerCount(user.id)}
											{getFollowerCount(user.id) === 1 ? 'user' : 'users'}
										</p>
									{/if}
								</div>
							</div>
							<a href={`api/profile/${user.username}`}>
								<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"
									>Visit</button
								>
							</a>
						</div>
					{/if}
				{/each}
			{:else}
			    <!-- Repeat similar structure as above, now for "See all" case -->
				{#each data.users as user}
					{#if user.username !== data.user.username}
						<div class="mb-4 flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<img
									class="h-8 w-8 rounded-full object-cover"
									src={user.profile_picture}
									alt="Suggested user"
									loading="lazy"
								/>
								<div>
									<div class="flex items-center space-x-1">
										<a href={`api/profile/${user.username}`}>
											<p class="text-sm text-white">{user.username}</p>
										</a>
										<!-- Admin badge -->
										{#if user.role === 'admin'}
											<img src="/admin.png" alt="Admin" class="h-4 w-4" />
										{/if}
									</div>
										<!-- Follower count message -->

									{#if getFollowerCount(user.id) === 0}
										<p class="text-xs text-gray-400">No followers yet</p>
									{:else}
										<p class="text-xs text-gray-400">
											Followed by {getFollowerCount(user.id)}
											{getFollowerCount(user.id) === 1 ? 'user' : 'users'}
										</p>
									{/if}
								</div>
							</div>
							<a href={`api/profile/${user.username}`}>
								<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"
									>Visit</button
								>
							</a>
						</div>
					{/if}
				{/each}
			{/if}
		</aside>
	</div>
</div>

<!-- Styles for Layout and Sidebar visibility adjustments -->

<style>
	/* Layout adjustment to account for the fixed left sidebar */
	.layout {
		display: flex;
		flex-direction: column;
		padding-left: 0;
		padding-right: 0; /* Default for small screens */
	}

	@media (min-width: 1024px) {
		/* Adjust content for large screens */
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
