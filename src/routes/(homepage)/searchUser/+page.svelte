<script>
	import { enhance } from '$app/forms';
	let { form, data } = $props(); 	// Receiving props passed into the component
	let users = data.user; // Current logged-in user
</script>

<!-- Search form for users -->
<form
	action="?/search_user"
	use:enhance
	method="POST"
	class="mx-auto mt-10 max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg"
>
	<h2 class="text-center text-xl font-semibold text-gray-800">Search Users</h2>

	<div class="flex items-center gap-2">
		<!-- Search input field -->
		<input
			type="text"
			name="input_value"
			placeholder="Search username..."
			class="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm transition focus:ring-2 focus:ring-pink-400 focus:outline-none"
		/>
		<!-- Submit button -->
		<button
			class="rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
		>
			Search
		</button>
	</div>
</form>

<!-- If form response exists (after submitting the form) -->
{#if form != null}
	<div class="mx-auto mt-6 max-w-md space-y-3 rounded-2xl bg-white p-4 shadow-md">
		<h3 class="border-b pb-2 text-base font-semibold text-gray-700">Results</h3>

		<!-- If users are found in the response -->
		{#if form.users.length > 0}
		<!-- Scrollable list container -->
		<div class="max-h-60 overflow-y-auto">
			{#each form.users as user}
				<!-- Each user item -->
				<div class="flex items-center gap-3">
					<!-- Profile ring effect -->
					<div
						class="h-11 w-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 p-0.5"
					>
						<!-- Inner circle with user's profile picture -->
						<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white">
							<img
								src={user.profile_picture}
								alt={user.username}
								class="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</div>
					<!-- Show @you if it's the current user -->
					{#if users.username === user.username}
						<!-- Username link -->
						<a href={`/profile`} class="text-sm text-blue-800 transition hover:text-pink-500">
							@ you
						</a>
					{:else}
						<!-- Otherwise show username with profile link -->
						<a
							href={`/api/profile/${user.username}`}
							class="text-sm text-gray-800 transition hover:text-pink-500"
						>
							@{user.username}
						</a>
					{/if}
					<!-- Show admin badge if user is admin -->
					{#if user.role === 'admin'}
						<img src="/admin.png" alt="Admin" class="h-4 w-4" />
					{/if}
				</div>
			{/each}
		</div>
		{:else}
					<!-- Message if no users found -->
			<p class="text-sm text-gray-500 italic">No users found.</p>
		{/if}
	</div>
{/if}
