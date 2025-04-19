<script>
	import { enhance } from '$app/forms';
	let { data, children } = $props();
	let user = data.user;
</script>

<!-- Mobile Navbar Section -->
<section
	class="fixed bottom-0 block w-full border-t-[1px] border-t-zinc-800 bg-black px-3 py-2 md:block lg:hidden"
>
	<nav>
		<ul class="flex justify-around text-white">
			<li class="flex flex-col items-center">
				<a href="/" class="flex flex-col items-center">
					<span class="text-xs">Home</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/searchUser" class="flex flex-col items-center">
					<span class="text-xs">Search</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/admin/articles_management" class="flex flex-col items-center">
					<span class="text-xs">Posts</span>
				</a>
			</li>
			<!-- Profile with dropdown -->
			<li class="relative flex flex-col items-center">
				<details class="group">
					<summary class="flex cursor-pointer list-none flex-col items-center">
						<a href="/profile" class="text-xs">Profile</a>
						<span class="text-[10px]">▼</span>
					</summary>

					<ul
						class="absolute right-0 bottom-10 z-50 mb-2 w-52 rounded-lg bg-white text-sm text-black shadow-lg"
					>
						<form action="/logout?/deleteAccount" method="POST">
							<li class="px-4 py-2">
								<button
									type="submit"
									class="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
								>
									Delete Account
								</button>
							</li>
						</form>
					</ul>
				</details>
			</li>
		</ul>
	</nav>
</section>

<div class="flex h-screen bg-black">
	<!-- Desktop Sidebar -->
	<section
		class="hidden h-full w-[245px] border-r-[1px] border-r-zinc-800 bg-black px-3 py-6 lg:fixed lg:block"
	>
		<div class="px-2 py-3">
			<a href="/"><h1 class="font-logo mb-2 text-4xl text-white">ShkodraWeb</h1></a>
		</div>
		<nav>
			<ul class="flex h-full flex-col justify-between py-7 text-base text-white">
				<!-- Home -->
				<li
					class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
				>
					<img class="h-9 w-9 object-cover" src="/white_home.png" alt="" loading="lazy" />
					<a href="/" class="font-sans text-[19px]">Home</a>
				</li>

				<!-- Search -->
				<li
					class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
				>
					<img class="h-9 w-9 object-cover" src="/search_icon.png" alt="" loading="lazy" />
					<a href="/searchUser" class="font-sans text-[19px]">Search</a>
				</li>

				<!-- Articles -->
				<li
					class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
				>
					<img class="h-9 w-9 object-cover" src="/collage.png" alt="" loading="lazy" />
					<a href="/admin/articles_management" class="font-sans text-[19px]">Posts</a>
				</li>

					<div
						class="hover:bg-opacity-10 flex cursor-pointer  items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
					>
						<div
							class="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5"
						>
							<div class="h-9 w-9 overflow-hidden rounded-full border-2 border-black bg-white">
								<img
									class="h-full w-full object-cover"
									src={user.profile_picture}
									alt=""
									loading="lazy"
								/>
							</div>
						</div>
						<a href="/profile" class="font-sans text-[19px]">Profile</a>
					</div>

					
			</ul>
		</nav>
	</section>

	<!-- Main Content -->
	<div class="flex-1 lg:ml-[20px]">
		{@render children()}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
	.font-logo {
		font-family: 'Grand Hotel', cursive;
	}
</style>
