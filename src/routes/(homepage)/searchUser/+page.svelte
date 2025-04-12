<script>
	import { enhance } from '$app/forms';
	let { form, data } = $props();
	let users = data.user;
</script>

<form
	action="?/search_user"
	use:enhance
	method="POST"
	class="mx-auto mt-10 max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-lg"
>
	<h2 class="text-center text-xl font-semibold text-gray-800">Search Users</h2>

	<div class="flex items-center gap-2">
		<input
			type="text"
			name="input_value"
			placeholder="Search username..."
			class="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm transition focus:ring-2 focus:ring-pink-400 focus:outline-none"
		/>

		<button
			class="rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
		>
			Search
		</button>
	</div>
</form>

{#if form != null}
	<div class="mx-auto mt-6 max-w-md space-y-3 rounded-2xl bg-white p-4 shadow-md">
		<h3 class="border-b pb-2 text-base font-semibold text-gray-700">Results</h3>

		{#if form.users.length > 0}
			{#each form.users as user}
				<div class="flex items-center gap-3">
					<!-- Profile ring effect (like IG stories) -->
					<div
						class="h-11 w-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 p-0.5"
					>
						<div class="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white">
							<img
								src={user.profile_picture}
								alt={user.username}
								class="h-full w-full object-cover"
								loading="lazy"
							/>
						</div>
					</div>

					{#if users.username === user.username}
						<!-- Username link -->
						<a href={`/profile`} class="text-sm text-gray-800 transition hover:text-pink-500">
							@{user.username}
						</a>
					{:else}
						<!-- Username link -->
						<a
							href={`/api/profile/${user.username}`}
							class="text-sm text-gray-800 transition hover:text-pink-500"
						>
							@{user.username}
						</a>
					{/if}
				</div>
			{/each}
		{:else}
			<p class="text-sm text-gray-500 italic">No users found.</p>
		{/if}
	</div>
{/if}
