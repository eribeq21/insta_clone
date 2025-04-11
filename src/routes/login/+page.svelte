<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	let { form } = $props();
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
	<!-- Login Form -->
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="w-full max-w-sm border border-gray-300 bg-white px-10 py-8 text-center"
	>
		<h1 class="font-logo mb-6 text-4xl">ShkodraWeb</h1>

		<input
			type="text"
			name="email"
			id="email"
			placeholder="Phone number, username, or email"
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
			class="w-full rounded bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
		>
			Log in
		</button>

		<p class="mt-3 text-sm text-gray-500">
			<a href="/forgot_password" class="text-blue-500 hover:underline">Forgot password?</a>
		</p>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>

	<!-- Sign Up Section -->
	<div class="mt-3 w-full max-w-sm border border-gray-300 bg-white px-6 py-4 text-center">
		<p class="text-gray-700">
			Don't have an account? <a href="/sign_up" class="font-semibold text-blue-500 hover:underline"
				>Sign up</a
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
