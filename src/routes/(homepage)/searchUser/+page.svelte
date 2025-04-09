<script>
	import { enhance } from "$app/forms";
	let { form} = $props();

</script>
<form 
	action="?/search_user" 
	use:enhance 
	method="POST" 
	class="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg space-y-4"
>
	<h2 class="text-xl font-semibold text-center text-gray-800">Search Users</h2>

	<div class="flex items-center gap-2">
		<input 
			type="text" 
			name="input_value" 
			placeholder="Search username..." 
			class="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
		/>

		<button 
			class="px-4 py-2 text-sm bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition">
			Search
		</button>
	</div>
</form>

{#if form != null}
	<div class="max-w-md mx-auto mt-6 bg-white p-4 rounded-2xl shadow-md space-y-3">
		<h3 class="text-base font-semibold text-gray-700 border-b pb-2">Results</h3>

		{#if form.users.length > 0}
			{#each form.users as user}
				<div class="flex items-center gap-3">
					<!-- Profile ring effect (like IG stories) -->
					<div class="h-11 w-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 p-0.5">
						<div class="h-10 w-10 rounded-full bg-white overflow-hidden border-2 border-white">
							<img
								src={user.profile_picture}
								alt={user.username}
								class="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</div>

					<!-- Username link -->
					<a href={`/api/profile/${user.username}`} class="text-sm text-gray-800 hover:text-pink-500 transition">
						@{user.username}
					</a>
				</div>
			{/each}
		{:else}
			<p class="text-gray-500 text-sm italic">No users found.</p>
		{/if}
	</div>
{/if}
