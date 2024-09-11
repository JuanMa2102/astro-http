import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    
    const posts = await getCollection('blog');

    const url = new URL(request.url);
    const slug = url.searchParams.get('slug') || '';
    
    const postBySlug = await getEntry('blog', slug)
    // const postBySlug = posts.filter(post => post.slug === slug);
    const statusCode = postBySlug ? 200: 404;
    return new Response(
        JSON.stringify( slug ? postBySlug: posts ) , 
        {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
};