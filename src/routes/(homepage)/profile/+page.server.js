import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (!locals.user) {
		redirect(302, '/login');
	}
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles = data.articles;

	articles = data.articles.filter((article) => article.author === locals.user.username);

	const connection = await createConnection();
	const [rows] = await connection.execute(
		'SELECT c.id, c.text, c.name, c.article_id FROM comments c;'
	);
	const [rowss] = await connection.execute('Select a.votes , a.id from articles a;');

	const [likesSum] = await connection.execute(
		'Select sum(votes) as votes from articles where author = ?',
		[locals.user.username]
	);

	const [countArticles] = await connection.execute(
		'Select count(*) as allArticles from articles where author = ? ',
		[locals.user.username]
	);
	
    const [followersPerUser] = await connection.execute(`
        SELECT 
            u.id,
            u.username,
            u.profile_picture,
            COUNT(f.follower_id) AS follower_count
        FROM users u
        LEFT JOIN follows f ON u.id = f.following_id
        where u.username = ? 
    `, [
        locals.user.username
    ]);

    const [followingPerUser] = await connection.execute(`
        SELECT 
            u.id,
            u.username,
            u.profile_picture,
            COUNT(f.following_id) AS following_count
        FROM users u
        LEFT JOIN follows f ON u.id = f.follower_id
        WHERE u.username = ?
        GROUP BY u.id
    `, [
		locals.user.username
        
    ]);
	return { articles, comments: rows, likes: rowss, user: locals.user, likesSum, countArticles , followersPerUser, followingPerUser}; // Pass ONLY articles
}
