<script>
	let { data, form } = $props(); 	// Data coming from the page props

	let user = data.user_profile;  // User's profile data
	let articles = data.articles; // List of articles posted by the user
	let profile = user.profile_picture;  // URL of the user's profile picture
	let alleLikes = data.likesSum[0].votes;  // Total number of likes for the user
	let allPosts = data.countArticles[0].allArticles; // Total number of posts by the user
	let followers = data.followersPerUser[0].follower_count; // Number of followers
	let following = data.followingPerUser[0].following_count; // Number of users the user is following
	
	let isFollowing = data.isFollowing; // Whether the current logged in user is following this user he is visiting  or not

	// States for showing followers/following lists
	let showFollowers = $state(false);
	let showFollowing = $state(false);

	// Current user data
	let current_user = data.user;
</script>

<div class="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8 lg:pl-[245px]">
	<!-- Profile Box -->
	<div class="mx-auto flex max-w-4xl flex-col gap-8">
		<!-- Top Section -->
		<div class="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
			<!-- Profile Picture -->
			<div class="relative">
				<div
					class="h-32 w-32 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 p-[3px]"
				>
					<div class="h-full w-full overflow-hidden rounded-full border-2 border-black bg-black">
						<img src={profile} alt="profile" class="h-full w-full object-cover" loading="lazy" />
					</div>
				</div>
			</div>

			<!-- User Info -->
			<div class="flex-1 space-y-4">
				<!-- Username & Buttons -->
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
					<div class="flex items-center justify-center">
						<p class="text-center text-2xl font-light sm:text-left">{user.username}</p>
						{#if user.role === 'admin'}
							<img src="/admin.png" alt="Admin" class="relative top-[3px] ml-2 h-4 w-4" />
						{/if}
					</div>

					<div class="flex justify-center sm:justify-start">
						<!-- Follow / Unfollow Button -->
						<form method="POST" action="?/toggleFollow">
							<input type="hidden" name="following_id" value={user.id} />

							{#if isFollowing}
								<button
									type="submit"
									class="rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-medium text-black transition hover:bg-gray-100"
								>
									Unfollow
								</button>
							{:else}
								<button
									type="submit"
									class="rounded-full bg-blue-500 px-4 py-1 text-sm font-medium transition hover:bg-blue-600"
								>
									Follow
								</button>
							{/if}
						</form>
					</div>
				</div>

				<!-- Stats -->
				<div class="flex items-center justify-center gap-6 text-sm sm:items-start sm:justify-start">
					<p><span class="font-semibold">{allPosts}</span> {allPosts === 1 ? 'post' : 'posts'}</p>
					<button
						onclick={() => (showFollowing = !showFollowing)}
						class="cursor-pointer hover:underline"
					>
						<span class="font-semibold">{following}</span> following
					</button>
					<button
						onclick={() => (showFollowers = !showFollowers)}
						class="cursor-pointer hover:underline"
					>
						<span class="font-semibold">{followers}</span>
						{followers === 1 ? 'follower' : 'followers'}
					</button>
				</div>

				<!-- Name + Bio -->
				<div class="text-sm sm:block sm:space-y-1">
					<p class="text-center text-xs text-white sm:text-left">{user.bio}</p>
					<p class="text-xs text-gray-500 sm:text-left">
						@All rights reserved from Eriseldi Zuckerberg
					</p>
				</div>
			</div>
		</div>

		<!-- Posts Grid -->
		<div class="grid grid-cols-3 gap-1 sm:gap-3">
			{#each articles as article (article.id)}
				<a href="/api/articles/{article.id}">
					<img
						src={article.image}
						alt="Post"
						class="aspect-square w-full bg-neutral-800 object-cover"
						loading="lazy"
					/>
				</a>
			{/each}
		</div>
	</div>

		<!-- Followers IF section -->
	{#if showFollowers}
		<div
			class="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:rounded-l-2xl sm:border-l"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-bold text-white">Followers</h2>
				<button
					onclick={() => (showFollowers = false)}
					class="text-sm text-white hover:text-red-400"
				>
					Close
				</button>
			</div>
			<!-- Display Followers List -->
			{#each data.followersList as follower}
				<div class="mb-4 flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<img
							class="h-8 w-8 rounded-full object-cover"
							src={follower.profile_picture}
							alt="Follower user"
							loading="lazy"
						/>
						<div>
							{#if current_user.username === following.username}
								<a href={`/profile`} onclick={() => (showFollowers = false)}>
									<p class="text-sm text-white">{follower.username}</p>
								</a>
							{:else}
								<a
									href={`/api/profile/${follower.username}`}
									onclick={() => (showFollowers = false)}
								>
									<p class="text-sm text-white">{follower.username}</p>
								</a>
							{/if}
						</div>
					</div>
					{#if current_user.username === follower.username}
						<a href={`/profile`} onclick={() => (showFollowers = false)}>
							<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"> You </button>
						</a>
					{:else}
						<a href={`/api/profile/${follower.username}`} onclick={() => (showFollowers = false)}>
							<button class="text-xs font-semibold text-blue-500 hover:text-blue-400">
								Visit
							</button>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{:else if showFollowing}
		<div
			class="fixed top-0 right-0 z-50 h-full w-full max-w-sm overflow-y-auto border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:rounded-l-2xl sm:border-l"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-lg font-bold text-white">Following</h2>
				<button
					onclick={() => (showFollowing = false)}
					class="text-sm text-white hover:text-red-400"
				>
					Close
				</button>
			</div>
			<!-- Display Following List -->

			{#each data.followingList as following}
				<div class="mb-4 flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<img
							class="h-8 w-8 rounded-full object-cover"
							src={following.profile_picture}
							alt="Following user"
							loading="lazy"
						/>
						<div>
							{#if current_user.username === following.username}
								<a href={`/profile`} onclick={() => (showFollowers = false)}>
									<p class="text-sm text-white">{following.username}</p>
								</a>
							{:else}
								<a
									href={`/api/profile/${following.username}`}
									onclick={() => (showFollowers = false)}
								>
									<p class="text-sm text-white">{following.username}</p>
								</a>
							{/if}
						</div>
					</div>
					{#if current_user.username === following.username}
						<a href={`/profile`} onclick={() => (showFollowing = false)}>
							<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"> You </button>
						</a>
					{:else}
						<div>
							<a
								href={`/api/profile/${following.username}`}
								onclick={() => (showFollowers = false)}
							>
								<p class="text-sm text-white">{following.username}</p>
							</a>
						</div>
						<a href={`/api/profile/${following.username}`} onclick={() => (showFollowing = false)}>
							<button class="text-xs font-semibold text-blue-500 hover:text-blue-400">
								Visit
							</button>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
