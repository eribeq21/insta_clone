import { register } from '$lib/db/auth'; // Import register function from auth module
import { redirect } from '@sveltejs/kit'; // For page redirection

export const actions = {
	register: async ({ request, cookies }) => {
		// Extract form input values
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const username = formData.get('username');

		// Basic email validation
		if (!email || !email.includes('@') || !email.includes('.')) {
			return {
				success: false,
				message: 'Please enter a valid e-mail address.'
			};
		}
		// Password length check
		if (!password || password.length < 8) {
			return {
				success: false,
				message: 'The password must be at least 8 characters long.'
			};
		}
		// Attempt user registration
		const { token, message } = await register(email, username, password);

		if (token) {
			// Set session cookie if successful
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7,
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			});
			// Redirect to homepage
			redirect(302, '/');
		} else {
			// Return error message on failure
			return {
				success: false,
				message: message
			};
		}
	}
};
