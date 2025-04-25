import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	// Check if user is authenticated
	if (!locals.user) {
		// If not logged in, redirect to the login page
		redirect(302, '/login');
	}
	// Fetch all articles from the custom API endpoint
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles = data.articles;

	// Get all articles written by the currently logged-in user
	articles = data.articles.filter((article) => article.author === locals.user.username);

	// Establish a connection to the MySQL database
	const connection = await createConnection();
	// Get all comments with their ID, text, name, and the article they belong to
	const [rows] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c;'
	);
	// Get all article votes and their corresponding article IDs
	const [rowss] = await connection.execute('Select a.votes , a.id from articles a;');
	// Get the total number of likes (votes) for articles authored by the current user
	const [likesSum] = await connection.execute(
		'Select sum(votes) as votes from articles where author = ?',
		[locals.user.username]
	);
	// Count the number of articles authored by the current user
	const [countArticles] = await connection.execute(
		'Select count(*) as allArticles from articles where author = ? ',
		[locals.user.username]
	);
	// Get the number of followers for the current user
	const [followersPerUser] = await connection.execute(
		`
        SELECT 
            u.id,
            u.username,
            u.profile_picture,
            COUNT(f.follower_id) AS follower_count
        FROM users u
        LEFT JOIN follows f ON u.id = f.following_id
        where u.username = ? 
    `,
		[locals.user.username]
	);
	// Get the number of users the current user is following
	const [followingPerUser] = await connection.execute(
		`
        SELECT 
            u.id,
            u.username,
            u.profile_picture,
            COUNT(f.following_id) AS following_count
        FROM users u
        LEFT JOIN follows f ON u.id = f.follower_id
        WHERE u.username = ?
        GROUP BY u.id
    `,
		[locals.user.username]
	);
	// Get a list of users who follow the current user
	const [followersList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.follower_id
		WHERE f.following_id = ?
		`,
		[locals.user.id]
	);
	// Get a list of users that the current user is following
	const [followingList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.following_id
		WHERE f.follower_id = ?
		`,
		[locals.user.id]
	);
	// Return all the collected data to be used on the client page
	return {
		articles,
		comments: rows,
		likes: rowss,
		user: locals.user,
		likesSum,
		countArticles,
		followersPerUser,
		followingPerUser,
		followersList,
		followingList
	};
}
