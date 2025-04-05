import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({ locals, fetch }) {
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}
	const res = await fetch('/api/articles');
	const data = await res.json();
	let articles;

    if(locals.user.role !== 'admin'){
	  articles = data.articles.filter(article => article.author === locals.user.username);
	}else{
      articles = data.articles;
	}


	return { articles , user: locals.user};
}

export const actions = {
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');
		const connection = await createConnection();
		const [result] = await connection.execute('Delete from articles where id = ?', [id]);
	}
};
