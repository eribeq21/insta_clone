import { createConnection } from '$lib/db/mysql';


// This is the GET API endpoint function
export async function GET({ params }) {
	// Try-catch block for error handling during the database query process
	try {
		// Extract the 'username' parameter from the URL
		const { username } = params;

		// Create a connection to the MySQL database
		const connection = await createConnection();

		// Execute a SQL query to find the user by username
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

		// Check if the user was found
		if (rows.length === 0) {
			// If no user is found, return a 404 error response
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		// If the user is found, return the user's data as a JSON response
		return new Response(JSON.stringify(rows[0]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// If there's an error during the database query process, catch it and log it
		console.error('Error fetching user profile:', error);
		// Return a 500 error response indicating a server/database issue
		return new Response(JSON.stringify({ error: 'Database query failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
