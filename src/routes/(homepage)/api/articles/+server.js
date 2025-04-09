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
				u.profile_picture
			FROM articles a
			JOIN users u ON a.author = u.username
			ORDER BY a.id DESC
		`);

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
