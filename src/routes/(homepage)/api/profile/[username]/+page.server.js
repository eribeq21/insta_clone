import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

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
		'Select sum(votes) as votes from articles where author = ?',
		[username]
	);

	const [countArticles] = await connection.execute(
		'Select count(*) as allArticles from articles where author = ? ',
		[username]
	);

	const currentUserId = locals.user.id;

	const [followCheck] = await connection.execute(
		`SELECT * FROM follows WHERE follower_id = ? AND following_id = ?`,
		[currentUserId, user_profile.id]
	);

	const isFollowing = followCheck.length > 0;

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
		[username]
	);

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
		[username]
	);

    const [followersList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.follower_id
		WHERE f.following_id = ?
		`,
		[user_profile.id]
	);
	
	const [followingList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.following_id
		WHERE f.follower_id = ?
		`,
		[user_profile.id]
	);

    

	return {
		user_profile,
		articles,
		likesSum,
		countArticles,
		isFollowing,
		followersPerUser,
		followingPerUser, 
        followingList, 
        followersList, 
        user: locals.user

	};
}

export const actions = {
	toggleFollow: async ({ request, locals }) => {
		const formData = await request.formData();
		const following_id = parseInt(formData.get('following_id'));
		const follower_id = locals.user.id;

		const connection = await createConnection();
		const [existing] = await connection.execute(
			`SELECT * FROM follows WHERE follower_id = ? AND following_id = ?`,
			[follower_id, following_id]
		);

		try {
			if (existing.length > 0) {
				await connection.execute(`DELETE FROM follows WHERE follower_id = ? AND following_id = ?`, [
					follower_id,
					following_id
				]);
				return { isFollowing: false };
			} else {
				await connection.execute(`INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`, [
					follower_id,
					following_id
				]);
				return { isFollowing: true };
			}
		} catch (err) {
			console.error('Follow toggle failed:', err);
		}
	}
};
