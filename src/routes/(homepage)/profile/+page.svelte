<script>
	import { enhance } from '$app/forms';
	let { data } = $props();
	let user = data.user;
	let articles = data.articles;
	let profile = user.profile_picture;
	let alleLikes = data.likesSum[0].votes;
	let allPosts = data.countArticles[0].allArticles;
	let followers = data.followersPerUser[0].follower_count;
	let following = data.followingPerUser[0].following_count;
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
					<div class="flex justify-center items-center">
					<p class="text-center text-2xl font-light sm:text-left">{user.username}</p>
					{#if user.role === 'admin'}
						<img src="/admin.png" alt="Admin" class="h-4 w-4 ml-2 relative top-[3px]" />
					{/if}
				   </div>

					<div class="flex gap-2">
						<a href="/profile/new_profile_picture"
							><button
								class="rounded-lg bg-zinc-800 px-4 py-1.5 text-sm text-white transition hover:bg-zinc-700"
							>
								Edit profile
							</button></a
						>
						<form action="/logout?/logout" method="POST" use:enhance>
							<button
								type="submit"
								class="rounded-lg bg-zinc-800 px-4 py-1.5 text-sm text-white transition hover:bg-zinc-700"
								>Log Out</button
							>
						</form>

						<button class="rounded-full bg-zinc-800 p-2 transition hover:bg-zinc-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<a href="admin/articles_management"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/></a
								>
							</svg>
						</button>
						<details class="group relative">
							<summary
								class="flex cursor-pointer items-center gap-2 rounded-full bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-md transition duration-200 hover:bg-zinc-800"
								title="Settings"
							>
								<img src="/settings.png" alt="Settings" class="h-4 w-4 object-contain" />
								<span>Settings</span>
							</summary>

							<ul
								class="absolute right-0 z-50 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-xl bg-white p-3 text-sm shadow-2xl ring-1 ring-black/5"
							>
								<form action="/logout?/deleteAccount" method="POST" use:enhance>
									<li class="py-2">
										<button
											type="submit"
											class="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
										>
											Delete Account
										</button>
									</li>
								</form>
							</ul>
						</details>
					</div>
				</div>

				<!-- Stats -->
				<div class="flex gap-6 text-sm">
					<p><span class="font-semibold">{allPosts}</span> {allPosts === 1 ? 'post' : 'posts'}</p>
					<p
						onclick={() => (showFollowing = !showFollowing)}
						class="cursor-pointer hover:underline"
					>
						<span class="font-semibold">{following}</span> following
					</p>
					<p
						onclick={() => (showFollowers = !showFollowers)}
						class="cursor-pointer hover:underline"
					>
						<span class="font-semibold">{followers}</span>
						{followers === 1 ? 'follower' : 'followers'}
					</p>
				</div>

				<!-- Name + Bio -->
				<div class="space-y-1 text-sm">
					<p class="text-white-500 text-xs">{user.bio}</p>
					<p class="text-xs text-gray-500">@All rights reserved from Eriseldi Zuckerberg</p>
				</div>
			</div>
		</div>

		<!-- Posts Grid -->
		<div class="grid grid-cols-3 gap-1 sm:gap-3">
			{#each articles as article (article.id)}
				<a href="api/articles/{article.id}">
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
						<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"> Visit </button>
					</a>
				</div>
			{/each}
		</div>
	{/if}

	{#if showFollowing}
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
						<button class="text-xs font-semibold text-blue-500 hover:text-blue-400"> Visit </button>
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
