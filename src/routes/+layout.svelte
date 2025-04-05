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
				<a href="/explore" class="flex flex-col items-center">
					<span class="text-xs">Explore</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/reels" class="flex flex-col items-center">
					<span class="text-xs">Reels</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/notifications" class="flex flex-col items-center">
					<span class="text-xs">Notifications</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/admin/articles_management" class="flex flex-col items-center">
					<span class="text-xs">Articles</span>
				</a>
			</li>
			<li class="flex flex-col items-center">
				<a href="/profile" class="flex flex-col items-center">
					<span class="text-xs">Profile</span>
				</a>
			</li>
		</ul>
	</nav>
</section>
<div class="flex h-screen">
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
				<li
					class="hover:bg-opacity-10 flex cursor-pointer rounded-3xl py-2 hover:bg-gray-500 active:font-semibold"
				>
					<a href="/profile" class="flex pl-3">
						<p class="ml-4 font-sans text-[16px]">Profile</p>
					</a>
				</li>
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
