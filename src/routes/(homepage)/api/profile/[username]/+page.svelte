<script>
	let { data, form } = $props();
	let user = data.user_profile;
	let articles = data.articles;
	let profile = user.profile_picture;
	let alleLikes = data.likesSum[0].votes;
	let allPosts = data.countArticles[0].allArticles;
	let followers = data.followersPerUser[0].follower_count;
	let following = data.followingPerUser[0].following_count;

	let isFollowing = data.isFollowing;

	let showFollowers = $state(false);
	let showFollowing = $state(false);
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
					<p class="text-center text-2xl font-light sm:text-left">{user.username}</p>

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
				<div class="flex gap-6 text-sm">
					<p><span class="font-semibold">{allPosts}</span> {allPosts === 1 ? 'post' : 'posts'}</p>
					<p onclick={() => showFollowing = !showFollowing} class="cursor-pointer hover:underline">
						<span class="font-semibold">{following}</span> following
					</p>
					<p onclick={() => showFollowers = !showFollowers} class="cursor-pointer hover:underline">
						<span class="font-semibold">{followers}</span>
						{followers === 1 ? 'follower' : 'followers'}
					</p>
				</div>

				<!-- Name + Bio -->
				<div class="space-y-1 text-sm">
					<p class="font-semibold">{user.full_name}</p>
					<p class="text-xs text-gray-500">@All rights reserved from Eriseldi Zuckerberg</p>
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
	{#if showFollowers}
	<div class="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-zinc-900 p-6 shadow-xl sm:rounded-l-2xl sm:border-l border-zinc-800">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-lg font-bold text-white">Followers</h2>
			<button
				onclick={() => showFollowers = false}
				class="text-white hover:text-red-400 text-sm"
			>
				Close
			</button>
		</div>

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
						<a href={`/api/profile/${follower.username}`}>
							<p class="text-sm text-white">{follower.username}</p>
						</a>
					</div>
				</div>
				<a href={`/api/profile/${follower.username}`}>
					<button class="text-xs font-semibold text-blue-500 hover:text-blue-400">
						Visit
					</button>
				</a>
			</div>
		{/each}
	</div>
{:else if showFollowing}
	<div class="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-zinc-900 p-6 shadow-xl sm:rounded-l-2xl sm:border-l border-zinc-800">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-lg font-bold text-white">Following</h2>
			<button
				onclick={() => showFollowing = false}
				class="text-white hover:text-red-400 text-sm"
			>
				Close
			</button>
		</div>

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
						<a href={`/api/profile/${following.username}`}>
							<p class="text-sm text-white">{following.username}</p>
						</a>
					</div>
				</div>
				<a href={`/api/profile/${following.username}`}>
					<button class="text-xs font-semibold text-blue-500 hover:text-blue-400">
						Visit
					</button>
				</a>
			</div>
		{/each}
	</div>
{/if}
</div>
