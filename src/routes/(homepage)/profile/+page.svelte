<script>
	import { enhance } from '$app/forms';
	let { data } = $props();
	let user = data.user;
	let articles = data.articles;
	let profile = user.profile_picture;
	let alleLikes = data.likesSum[0].votes;
	let allPosts = data.countArticles[0].allArticles;
	let followers  = data.followersPerUser[0].follower_count;
	let following = data.followingPerUser[0].following_count;
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
					</div>
				</div>

				<!-- Stats -->
				<div class="flex gap-6 text-sm">
					<p><span class="font-semibold">{allPosts}</span> {allPosts === 1 ? 'post' : 'posts'}</p>
					<p><span class="font-semibold">{following} </span> following</p>
					<p><span class="font-semibold">{followers}</span> {followers === 1 ? 'follower' : 'followers'}</p>
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
</div>
