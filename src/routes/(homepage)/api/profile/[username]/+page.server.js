import { createConnection } from '$lib/db/mysql';

export async function load({ params, fetch, locals }) {
	if (!locals.user) {
		redirect(302, '/login');
	}

	const username = params.username;
	const res = await fetch(`/api/profile/${username}`);
	const user_profile = await res.json();

	const connection = await createConnection();
	const [articles] = await connection.execute('SELECT * FROM articles where author = ? ', [
		username
	]);

	const [likesSum] = await connection.execute(
		'Select sum(votes) as votes from articles where author = ?', [
			username
		]
	)

	const [countArticles] = await connection.execute(
		'Select count(*) as allArticles from articles where author = ? ', [
			username
		]
	)


	return {
		user_profile,
		articles, 
		likesSum, 
		countArticles
	};
}
