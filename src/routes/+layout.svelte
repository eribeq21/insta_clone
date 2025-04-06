<script>
	import '../app.css';
	let { children } = $props();
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
				<a href="/search" class="flex flex-col items-center">
					<span class="text-xs">Search</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/admin/articles_management" class="flex flex-col items-center">
					<span class="text-xs">Articles</span>
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
						<form action="/logout?/logout" method="POST">
							<li class="cursor-pointer px-4 py-2 hover:bg-gray-100">
								<button type="submit" class="w-full text-left">Log Out</button>
							</li>
						</form>

						<a href="/profile/new_profile_picture">
							<li class="cursor-pointer px-4 py-2 hover:bg-gray-100">Change Profile Picture</li>
						</a>

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
			<a href="/"><h1 class="font-logo mb-2 text-4xl text-white">Instagram</h1></a>
		</div>
		<nav>
			<ul class="flex h-full flex-col space-y-4 py-7 text-base text-white">
				<li
					class="hover:bg-opacity-10 flex cursor-pointer rounded-3xl py-2 hover:bg-gray-500 active:font-semibold"
				>
					<a href="/" class="flex pl-3">
						<p class="ml-4 font-sans text-[16px]">Home</p>
					</a>
				</li>
				<li
					class="hover:bg-opacity-10 flex cursor-pointer rounded-3xl py-2 hover:bg-gray-500 active:font-semibold"
				>
					<a href="/search" class="flex pl-3">
						<p class="ml-4 font-sans text-[16px]">Search</p>
					</a>
				</li>

				<li
					class="hover:bg-opacity-10 flex cursor-pointer rounded-3xl py-2 hover:bg-gray-500 active:font-semibold"
				>
					<a href="/admin/articles_management" class="flex pl-3">
						<p class="ml-4 font-sans text-[16px]">Articles</p>
					</a>
				</li>
				<details class="group">
					<summary
						class="hover:bg-opacity-10 flex cursor-pointer list-none rounded-3xl py-2 pl-3 hover:bg-gray-500 active:font-semibold"
					>
						<a href="/profile"><p class="ml-4 font-sans text-[16px]">Profile</p></a>
					</summary>

					<ul class="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white shadow-lg">
						<form action="/logout?/logout" method="POST" class="mt-4">
							<li class="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
								<button type="submit">Log Out</button>
							</li>
						</form>

						<a href="/profile/new_profile_picture"
							><li class="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
								Change Profile Picture
							</li></a
						>
						<form action="/logout?/deleteAccount" method="POST" class="mt-4">
							<li class="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
								<button
									type="submit"
									class="w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600"
									>Delete Account</button
								>
							</li>
						</form>
					</ul>
				</details>
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
