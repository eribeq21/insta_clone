import { createConnection } from '$lib/db/mysql';

export async function GET() {
	try {
		const connection = await createConnection();
		const [rows] = await connection.execute('SELECT * FROM articles');

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
