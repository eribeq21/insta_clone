export async function load({ locals, fetch }) {
    if (!locals.user) {
            redirect(302, '/login');
        }



    return{
        user: locals.user
    }



}