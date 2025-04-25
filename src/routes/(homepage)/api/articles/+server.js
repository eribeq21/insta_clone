import { createConnection } from '$lib/db/mysql';

export async function GET() {
	try {
		const connection = await createConnection();
		const [rows] = await connection.execute(`
			SELECT 
				a.id,
				a.image,
				a.description,
				a.votes,
				a.author,
				u.profile_picture, 
				u.role
			FROM articles a
			JOIN users u ON a.author = u.username
			ORDER BY a.id DESC
		`);
		/*
		 So insted of listing them by votes I  thought it would be better 
		 to list them based on their id because so the newest picture would 
		 be shown to the landpage.Alternative sql query to list them with likes would be:
		 SELECT 
				a.id,
				a.image,
				a.description,
				a.votes,
				a.author,
				u.profile_picture, 
				u.role
			FROM articles a
			JOIN users u ON a.author = u.username
			ORDER BY a.votes DESC limit 25
*/
		return new Response(JSON.stringify({ articles: rows }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Database query failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
