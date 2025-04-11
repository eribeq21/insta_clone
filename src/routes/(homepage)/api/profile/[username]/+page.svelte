<script>
	let { data } = $props();
	let user = data.user_profile;
	let articles = data.articles;
	let profile = user.profile_picture;
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
				</div>

				<!-- Stats -->
				<div class="flex gap-6 text-sm">
					<p><span class="font-semibold">102</span> posts</p>
					<p><span class="font-semibold">102</span> followers</p>
					<p><span class="font-semibold">102</span> following</p>
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
</div>
