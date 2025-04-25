import { createConnection } from '$lib/db/mysql';

// Define the GET request handler for fetching an article by its ID

export async function GET({ params }) {
	try {
		 // Destructure the `uuid` from the dynamic route , which is the article's ID
		const { uuid } = params;

		const connection = await createConnection();     // Create a connection to the MySQL database
    
	
		// Execute the SQL query to fetch article details by ID, joining with the users table to get the author's profile picture
		const [rows] = await connection.execute(
			`	SELECT 
				a.id,
				a.image,
				a.description,
				a.votes,
				a.author,
				u.profile_picture
			FROM articles a
			JOIN users u ON a.author = u.username
			where a.id = ? `,
			[uuid] // Use the `uuid` (article ID) to filter the query
		);

		// Check if any rows were returned 
		if (rows.length === 0) {
			 // If no article is found, return a 404 error with a message
			return new Response(JSON.stringify({ error: 'Article not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}
        // If the article is found, return the article data with a 200 OK status
		return new Response(JSON.stringify(rows[0]), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// In case of any error (e.g., database query failure), return a 500 error with a message
		return new Response(JSON.stringify({ error: 'Database query failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
