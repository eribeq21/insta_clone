import { createConnection } from '$lib/db/mysql';


// GET function to fetch articles from the database
export async function GET() {
	try {
		// Establish connection to the MySQL database
		const connection = await createConnection();
		// Execute a query to retrieve articles along with author information (username, profile picture, role)
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
			Alternative approach to ordering the articles:
			Instead of listing the articles by their IDs (which shows the most recent articles first),
			you could order them based on their vote count (likes), as shown below.
			This alternative query would show the most popular articles, instead of the latest.
			To list by votes:
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


		// Return the list of articles as a JSON response
		return new Response(JSON.stringify({ articles: rows }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// If an error occurs during the database query, return a 500 error response
		return new Response(JSON.stringify({ error: 'Database query failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
