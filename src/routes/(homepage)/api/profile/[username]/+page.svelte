<script>
	let { data } = $props();
	let user = data.user_profile;
	let articles = data.articles;
	let profile = user.profile_picture;
</script>

<div class="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8 lg:pl-[245px]">
	<!-- Profile Box -->
	<div class="mx-auto max-w-4xl flex flex-col gap-8">
		<!-- Top Section -->
		<div class="flex flex-col sm:flex-row items-center sm:items-start gap-8">
			<!-- Profile Picture -->
			<div class="relative">
				<div class="h-32 w-32 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 p-[3px]">
					<div class="h-full w-full rounded-full overflow-hidden bg-black border-2 border-black">
						<img
							src={profile}
							alt="profile"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>
				</div>
			</div>

			<!-- User Info -->
			<div class="flex-1 space-y-4">
				<!-- Username & Buttons -->
				<div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
					<p class="text-2xl font-light text-center sm:text-left">{user.username}</p>

					<div class="flex gap-2">
						<a href="/profile/new_profile-picture">
							<button class="rounded-lg bg-zinc-800 px-4 py-1.5 text-sm text-white hover:bg-zinc-700 transition">
								Edit profile
							</button>
						</a>
						<form action="/logout?/logout" method="POST">
							<button type="submit" class="rounded-lg bg-zinc-800 px-4 py-1.5 text-sm text-white hover:bg-zinc-700 transition">
								Log Out
							</button>
						</form>
						<button class="rounded-full bg-zinc-800 p-2 hover:bg-zinc-700 transition">
							<a href="/admin/articles_management">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
							</a>
						</button>
					</div>
				</div>

				<!-- Stats -->
				<div class="flex gap-6 text-sm">
					<p><span class="font-semibold">102</span> posts</p>
					<p><span class="font-semibold">102</span> followers</p>
					<p><span class="font-semibold">102</span> following</p>
				</div>

				<!-- Name + Bio -->
				<div class="text-sm space-y-1">
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
						class="aspect-square w-full object-cover bg-neutral-800"
						loading="lazy"
					/>
				</a>
			{/each}
		</div>
	</div>
</div>
