<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	export let form;
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<!-- Sign-Up Form -->
	<form
		action="?/register"
		method="POST"
		use:enhance
		class="w-full max-w-sm border border-gray-300 bg-white px-10 py-8 text-center"
	>
		<h1 class="font-logo mb-2 text-4xl">ShkodraWeb</h1>
		<p class="mb-4 text-sm text-gray-500">Sign up to see photos and videos from your friends.</p>

		<div class="mb-4 flex items-center">
			<hr class="flex-grow border-gray-300" />
			<span class="px-2 text-sm text-gray-500">FILL</span>
			<hr class="flex-grow border-gray-300" />
		</div>

		<input
			type="text"
			name="email"
			id="email"
			placeholder="Email"
			required
			class="mb-3 w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 focus:border-gray-400 focus:outline-none"
		/>

		<input
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			required
			class="mb-3 w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 focus:border-gray-400 focus:outline-none"
		/>

		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			required
			class="mb-4 w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 focus:border-gray-400 focus:outline-none"
		/>

		<button
			type="submit"
			class="w-full cursor-pointer rounded bg-blue-500 py-2 font-semibold text-white"
		>
			Sign up
		</button>

		<p class="mt-3 text-xs text-gray-500">
			By signing up, you agree to our <span class="font-semibold">Terms</span>,
			<span class="font-semibold">Data Policy</span>, and
			<span class="font-semibold">Cookies Policy</span>.
		</p>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>

	<!-- Log-in Section -->
	<div class="mt-3 w-full max-w-sm border border-gray-300 bg-white px-6 py-4 text-center">
		<p class="text-gray-700">
			Have an account? <a href="/login" class="font-semibold text-blue-500 hover:underline"
				>Log in</a
			>
		</p>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');

	.font-logo {
		font-family: 'Grand Hotel', cursive;
	}
</style>
