export async function load({ locals }) {
	// Return the user data from the `locals` object
	// `locals.user` contains the logged-in user's data
	return { user: locals.user };
}
