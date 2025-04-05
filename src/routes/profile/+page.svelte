<script>
	let { data } = $props();
	let user = data.user;
	let articles = data.articles;
	let profile = user.profile_picture;
</script>

<!-- Main Container: Padding left auf Desktop wegen Sidebar -->
<div class="min-h-screen bg-black text-white lg:pl-[245px] px-4 sm:px-6 lg:px-8 py-10">

	<!-- Profil Box -->
	<div class="max-w-2xl mx-auto bg-black rounded-lg shadow-md">
		<div class="px-3 py-2">
			<div class="flex flex-col gap-1 text-center">
				<a href="/profile/new_profile-picture"><img class="mx-auto w-24 h-24 rounded-full border border-gray-400 shadow-lg object-cover" src={profile} alt=""></a>

				<p class="font-serif font-semibold text-xl">{user.username}</p>
				<span class="text-sm text-gray-400">New York, NY - Los Angeles, CA</span>
				<span class="text-sm text-blue-400 break-words">{user.website}</span>
			</div>

			<!-- Stats -->
			<div class="flex justify-center items-center gap-6 my-4 text-center text-sm sm:text-base">
				<div>
					<p class="text-white font-bold">102</p>
					<span class="text-gray-400">Posts</span>
				</div>
				<div>
					<p class="text-white font-bold">102</p>
					<span class="text-gray-400">Followers</span>
				</div>
				<div>
					<p class="text-white font-bold">102</p>
					<span class="text-gray-400">Following</span>
				</div>
			</div>

			<!-- Buttons -->
			<div class="flex flex-col sm:flex-row justify-center gap-3 my-4">
				<button class="bg-pink-500 px-8 py-2 rounded-full text-white shadow-md hover:bg-pink-600 transition">Follow</button>
				<button class="bg-white text-black px-8 py-2 rounded-full border border-gray-400 shadow-md hover:bg-gray-200 transition">Message</button>
			</div>

			<!-- Tabs -->
			<div class="flex justify-center gap-6 border-b border-gray-600 pb-2">
				<button class="border-b-2 border-yellow-400 pb-1">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
					</svg>
				</button>
				<button class="pb-1">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
					</svg>
				</button>
			</div>

			<!-- Grid Placeholder for Posts -->
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
				<!-- Beispiel-Post -->
                 {#each articles as article (article.id) }
                <img src={article.image} alt="" class="block bg-gray-700 h-40 w-full rounded-lg object-cover" />
				<!-- Füge hier dynamisch weitere Posts ein -->
                {/each}
			</div>
		</div>
	</div>
</div>
