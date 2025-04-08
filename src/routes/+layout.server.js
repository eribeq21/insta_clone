

export async function load({ locals, fetch }) {
  
    if (!locals.user) {
        return { user: null }; // No user is logged in
    }
    return { user: locals.user }; // Pass ONLY articles
}
