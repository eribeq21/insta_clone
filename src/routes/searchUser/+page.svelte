<script>
	import { enhance } from "$app/forms";
	let { form} = $props();

</script>

<form 
	action="?/search_user" 
	use:enhance 
	method="POST" 
	class="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-xl space-y-4"
>
	<h2 class="text-2xl font-bold text-center text-gray-800">Search Users</h2>

	<div class="flex items-center gap-2">
		<input 
			type="text" 
			name="input_value" 
			placeholder="Enter a username..." 
			class="flex-grow px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
		/>

		<button 
			class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition">
			Search
		</button>
	</div>
</form>
{#if form != null}
	<div class="max-w-md mx-auto mt-6 bg-white p-4 rounded-xl shadow-lg space-y-2">
		<h3 class="text-lg font-semibold text-gray-700">Results:</h3>

		{#if form.users.length > 0}
			{#each form.users as user}
				<div class="flex items-center gap-3">
					<div class="h-11 w-11 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 p-0.5">
						<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-black bg-white">
							<img
								class="h-full w-full object-cover"
								src={user.profile_picture}
								alt={user.username}
								loading="lazy"
							/>
						</div>
					</div>
					<a href="api/profile/{user.username}">
						<p class="text-blue-600 font-medium hover:underline cursor-pointer">{user.username}</p>
					</a>
				</div>
			{/each}
		{:else}
			<p class="text-gray-500 italic">No users found.</p>
		{/if}
	</div>
{/if}
