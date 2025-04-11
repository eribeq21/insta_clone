import { createConnection } from '$lib/db/mysql';

export async function GET({ params }) {
	try {
		const { username } = params;

		const connection = await createConnection();
		const [rows] = await connection.execute(
			`
            SELECT
                *
            FROM
                users
            WHERE
                username = ?
            `,
			[username]
		);

		if (rows.length === 0) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify(rows[0]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching user profile:', error);
		return new Response(JSON.stringify({ error: 'Database query failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
