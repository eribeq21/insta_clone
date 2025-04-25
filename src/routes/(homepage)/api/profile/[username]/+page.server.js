import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ params, fetch, locals }) {
	// Check if a user is logged in 
	if (!locals.user) {
		redirect(302, '/login');     // If not logged in, redirect to the login page

	}

    // Extract the username from the dynamic route 
	const username = params.username;

	// Fetch the user profile data from the `/api/profile/{username}` endpoint
	const res = await fetch(`/api/profile/${username}`);
	const user_profile = await res.json();


    // Create a connection to the MySQL database
	const connection = await createConnection();

	// Query to get all articles uploaded by the user
	const [articles] = await connection.execute('SELECT * FROM articles where author = ? ', [
		username
	]);
     // Query to get the sum of votes across all articles by the user
	const [likesSum] = await connection.execute(
		'Select sum(votes) as votes from articles where author = ?',
		[username]
	);
    // Query to count the total number of articles posted  by the user
	const [countArticles] = await connection.execute(
		'Select count(*) as allArticles from articles where author = ? ',
		[username]
	);

    // Get the current logged-in user's ID
	const currentUserId = locals.user.id;

    // Query to check if the current user is already following the profile user
	const [followCheck] = await connection.execute(
		`SELECT * FROM follows WHERE follower_id = ? AND following_id = ?`,
		[currentUserId, user_profile.id]
	);
    // Determine if the current user is following the profile user
	const isFollowing = followCheck.length > 0;
    // Query to get the followers count and details for the profile user
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
    // Query to get the following count and details for the profile user
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

    // Query to get the list of followers for the profile user
	const [followersList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.follower_id
		WHERE f.following_id = ?
		`,
		[user_profile.id]
	);
    // Query to get the list of users the profile user is following

	const [followingList] = await connection.execute(
		`
		SELECT u.id, u.username, u.profile_picture
		FROM follows f
		JOIN users u ON u.id = f.following_id
		WHERE f.follower_id = ?
		`,
		[user_profile.id]
	);
  // Return all the data to the front-end

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
	// Action to toggle the follow state
	toggleFollow: async ({ request, locals }) => {
		// Get the form data to get the following_id (the user being followed/unfollowed)
		const formData = await request.formData();
		const following_id = parseInt(formData.get('following_id'));
		const follower_id = locals.user.id; // Get the current user's ID

		// Create a connection to the MySQL database
		const connection = await createConnection();

		// Check if there's already an existing follow relationship between the current user and the target user
		const [existing] = await connection.execute(
			`SELECT * FROM follows WHERE follower_id = ? AND following_id = ?`,
			[follower_id, following_id]
		);

		try {
			 // If the user is already following the profile user, unfollow them
			if (existing.length > 0) {
				await connection.execute(`DELETE FROM follows WHERE follower_id = ? AND following_id = ?`, [
					follower_id,
					following_id
				]);
				return { isFollowing: false }; // Return the new follow state (not following)
			} else {
				// If the user is not following the profile user, follow them
				await connection.execute(`INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`, [
					follower_id,
					following_id
				]);
				return { isFollowing: true }; // Return the new follow state (following)
			}
		} catch (err) {
			console.error('Follow toggle failed:', err); // Handle any error that occurs during the process
		}
	}
};
