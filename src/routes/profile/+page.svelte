<script>
	let { data } = $props();
	let user = data.user;
	let articles = data.articles;
	let profile = user.profile_picture;
</script>

<!-- Main Container: Padding left auf Desktop wegen Sidebar -->
<div class="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8 lg:pl-[245px]">
	<!-- Profil Box -->
	<div class="mx-auto max-w-2xl rounded-lg bg-black shadow-md">
		<div class="px-3 py-2">
			<div class="flex flex-col gap-1 text-center">
				<a href="/profile/new_profile-picture"
					><img
						class="mx-auto h-24 w-24 rounded-full border border-gray-400 object-cover shadow-lg"
						src={profile}
						alt=""
                        loading="lazy"
					/></a
				>

				<p class="font-serif text-xl font-semibold">{user.username}</p>
				<span class="text-sm text-gray-400">New York, NY - Los Angeles, CA</span>
				<span class="text-sm break-words text-blue-400">{user.website}</span>
			</div>

			<!-- Stats -->
			<div class="my-4 flex items-center justify-center gap-6 text-center text-sm sm:text-base">
				<div>
					<p class="font-bold text-white">102</p>
					<span class="text-gray-400">Posts</span>
				</div>
				<div>
					<p class="font-bold text-white">102</p>
					<span class="text-gray-400">Followers</span>
				</div>
				<div>
					<p class="font-bold text-white">102</p>
					<span class="text-gray-400">Following</span>
				</div>
			</div>

			<!-- Buttons -->
			<div class="my-4 flex flex-col justify-center gap-3 sm:flex-row">
				<button
					class="rounded-full bg-pink-500 px-8 py-2 text-white shadow-md transition hover:bg-pink-600"
					>Follow</button
				>
				<button
					class="rounded-full border border-gray-400 bg-white px-8 py-2 text-black shadow-md transition hover:bg-gray-200"
					>Message</button
				>
			</div>

			<!-- Tabs -->
			<div class="flex justify-center gap-6 border-b border-gray-600 pb-2">
				<button class="border-b-2 border-yellow-400 pb-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
				</button>
				<button class="pb-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</button>
			</div>

			<!-- Grid Placeholder for Posts -->
			<div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
				<!-- Beispiel-Post -->
				{#each articles as article (article.id)}
					<a href="api/articles/{article.id}"><img
						src={article.image}
						alt=""
						class="block h-40 w-full rounded-lg bg-gray-700 object-cover" 
                        loading="lazy"
					/></a>
					<!-- Füge hier dynamisch weitere Posts ein -->
				{/each}
			</div>
		</div>
	</div>
</div>
