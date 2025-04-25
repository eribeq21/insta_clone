import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	// This is the 'login' action
	login: async ({ request, cookies }) => {
		const formData = await request.formData(); 		// Extract form data from the incoming request
		const email = formData.get('email'); // Get the user's email from the form
		const password = formData.get('password');  // Get the user's password from the form


		const token = await login(email, password); // Attempt to log the user in using the provided credentials

		if (token) {
			// Set session cookie if login succeeds
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7, // Cookie expiration
				path: '/', // Cookie is valid for the entire site
				httpOnly: true,
				sameSite: 'strict'
			});
			redirect(302, '/'); // Redirect the user to the home page
		} else {
			// If login fails, return an error object
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};
