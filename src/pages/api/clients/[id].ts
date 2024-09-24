import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const prerender = false;
export const PATCH: APIRoute = async ({ params, request }) => {
    const clientId = Number(params.id ) || 0;
    try {
        const {id, ...body} = await request.json();
        
        const results = await db.update(Clients).set( body )
            .where( eq( Clients.id, clientId ) );
        
        const updatedClient = await db
            .select()
            .from(Clients)
            .where( eq( Clients.id, clientId ) )

        return new Response( 
            JSON.stringify( updatedClient.at(0) ) ,
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }  
        );

    } catch (error) {
        return new Response( 
            JSON.stringify( {
                error
            } ) , 
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }  
        );
    }
}

export const DELETE: APIRoute = async ({ params, request }) => {
    const clientId = Number(params.id ) || 0;

    await db.delete(Clients).where( eq( Clients.id, clientId ) );
    
    return new Response( 
        JSON.stringify( {
            success: true
        } ) , 
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        } 
    );
}

export const GET: APIRoute = async ({ params, request }) => {

    const clientId = Number(params.id ) || 0;

    const client = await db
        .select()
        .from(Clients)
        .where( eq( Clients.id, clientId ) )

    return new Response( 
        JSON.stringify( client.at(0) ) ,
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }  
    );
}