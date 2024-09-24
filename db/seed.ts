import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';
import type { any } from 'astro:schema';

// https://astro.build/db/seed

interface Post {
	id: string
	title: string
	likes: number
}

export default async function seed() {
	await db.insert(Clients).values([
		{ id:1, name: 'John Doe', age: 32, isActive: true },
		{ id:2, name: 'Jane Doe', age: 28, isActive: false },
		{ id:3, name: 'Bob Smith', age: 45, isActive: true },
		{ id:4, name: 'Alice Johnson', age: 29, isActive: false },
		{ id:5, name: 'Mike Williams', age: 37, isActive: true },
		{ id:6, name: 'Emily Brown', age: 23, isActive: false },
	]);

	const posts = await getCollection('blog');
	await db.insert(Posts).values(
		posts.map( (post: any) => ({ 
			id: post.id, 
			title: post.data.title, 
			likes: Math.round(Math.random() * 100) 
		}) )
	)	
}


