<script>
	import { enhance } from '$app/forms';
	let { data, children } = $props(); // Destructure data and children from props passed to this layout
	let user = data.user; 	// Extract user data from the passed data 

</script>

<!-- Mobile Navbar Section -->
<section
	class="fixed bottom-0 block w-full border-t-[1px] border-t-zinc-800 bg-black px-3 py-2 md:block lg:hidden"
>
	<nav>
		<ul class="flex justify-around text-white">
			<!-- Home link -->
			<a href="/"
				><li class="flex flex-col items-center">
					<div class="flex flex-col items-center">
						<span class="text-xs">Home</span>
					</div>
				</li>
			</a>
			<!-- Search User link -->
			<a href="/searchUser">
				<li class="flex flex-col items-center">
					<div class="flex flex-col items-center">
						<span class="text-xs">Search</span>
					</div>
				</li>
			</a>
			<!-- Posts link, conditional based on user role (admin or regular user) -->
			<a href={user.role === 'admin' ? '/admin/articles_management' : '/users/articles_management'}>
				<li class="flex flex-col items-center">
					<div class="flex flex-col items-center">
						<span class="text-xs">Posts</span>
					</div>
				</li></a
			>
			<!-- Profile link -->
			<a href="/profile">
				<li class="relative flex flex-col items-center">
					<div class="flex cursor-pointer list-none flex-col items-center">
						<span class="text-xs">Profile</span>
					</div>
				</li>
			</a>
		</ul>
	</nav>
</section>

<div class="flex h-screen bg-black">
	<!-- Desktop Sidebar -->
	<section
		class="hidden h-full w-[245px] border-r-[1px] border-r-zinc-800 bg-black px-3 py-6 lg:fixed lg:block"
	>
		<!-- Brand Logo and Home Link -->
		<a href="/"
			><div class="px-2 py-3">
				<h1 class="font-logo mb-2 text-4xl text-white">ShkodraWeb</h1>
			</div>
		</a>
		<nav>
			<ul class="flex h-full flex-col justify-between py-7 text-base text-white">
				<!-- Home -->
				<a href="/">
					<li
						class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
					>
						<img class="h-9 w-9 object-cover" src="/white_home.png" alt="" loading="lazy" />
						<div class="font-sans text-[19px]">Home</div>
					</li>
				</a>

				<!-- Search -->
				<a href="/searchUser">
					<li
						class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
					>
						<img class="h-9 w-9 object-cover" src="/search_icon.png" alt="" loading="lazy" />
						<div class="font-sans text-[19px]">Search</div>
					</li>
				</a>

				<!-- Posts link in Sidebar, conditional based on user role (admin or regular user) -->
				<a
					href={user.role === 'admin' ? '/admin/articles_management' : '/users/articles_management'}
				>
					<li
						class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
					>
						<img class="h-9 w-9 object-cover" src="/collage.png" alt="" loading="lazy" />
						<div class="font-sans text-[19px]">Posts</div>
					</li>
				</a>
				<!-- Profile link in Sidebar -->
				<a href="/profile">
					<div
						class="hover:bg-opacity-10 flex cursor-pointer items-center space-x-4 rounded-3xl px-3 py-2 hover:bg-gray-500"
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
						<div class="font-sans text-[19px]">Profile</div>
					</div>
				</a>
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
	/* Custom font for the logo */
	.font-logo {
		font-family: 'Grand Hotel', cursive;
	}
</style>
