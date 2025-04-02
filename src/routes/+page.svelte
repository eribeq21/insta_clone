<script lang="javascript">
	let { data } = $props();
;</script>

<div class="bg-black">




    <!-- Story Section -->

	<section class="mx-auto max-w-screen-md px-4">
		<div class="py-4">
			<div class="mt-4 rounded-lg bg-black">
				<div class="flex overflow-x-auto space-x-4 px-4 py-2">
					<!-- User Profile 1 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-cover rounded-full" src="Eriseldi.jpg" alt="Eriseldi" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">Eriseldi</p>
					</div>
					<!-- User Profile 2 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/2.jpg" alt="user2" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user2</p>
					</div>
					<!-- Repeat similar structure for other user profiles -->
					<!-- User Profile 3 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/3.jpg" alt="user3" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user3</p>
					</div>
					<!-- User Profile 4 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/4.jpg" alt="user4" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user4</p>
					</div>
					<!-- User Profile 5 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/5.jpg" alt="user5" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user5</p>
					</div>
					<!-- User Profile 6 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/6.jpg" alt="user6" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user6</p>
					</div>
					<!-- User Profile 7 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/7.jpg" alt="user7" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user7</p>
					</div>
					<!-- User Profile 8 -->
					<div class="text-center flex-shrink-0">
						<div class="rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
							<div class="wrapper h-14 w-14 overflow-hidden rounded-full border-2 border-black bg-white">
								<img class="h-full w-full object-contain" src="https://randomuser.me/api/portraits/men/8.jpg" alt="user8" />
							</div>
						</div>
						<p class="pt-1 pb-2 text-xs text-white">user8</p>
					</div>
				</div>
			</div>
		</div>
	{#each  data.articles as article (article.id)}
		
		<!-- Article Section-->
		<div class="rounded-lg bg-black">
			<div class="mb-4">
				<div class="flex flex-row items-center gap-2 text-center">
					<div class="h-11 w-11 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
						<div class="wrapper h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-white">
							<img class="h-full w-full object-cover rounded-full" src="Eriseldi.jpg" alt="Eriseldi" />
						</div>
					</div>
					<p class="pt-1 pb-2 text-sm font-semibold text-white">{article.author}</p>
				</div>
			</div>
			<div>
				<div>
					<img class="w-full" src={article.image} alt="" />
				</div>
			</div>
	
			<div class="space-y-1 pt-1 pb-2 text-sm">
				<div>
					<p class="cursor-pointer font-semibold text-white">37.103 likes</p>
				</div>
				<div>
					<p class="cursor-pointer text-white">{article.description}</p>
				</div>
				<div>
					<p class="cursor-pointer text-gray-500">View all 400 comments</p>
				</div>
			</div>
			<div class="flex flex-row justify-between space-x-3 py-3">
				<div class="">
					<p class="text-sm text-gray-400">Add a comment...</p>
				</div>
				<button class="cursor-pointer font-semibold text-blue-400">Post</button>
			</div>
		</div>
		{/each}

		
	</section>
	
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

	.font-logo {
		font-family: 'Grand Hotel', cursive;
	}
</style>
