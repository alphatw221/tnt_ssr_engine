

import { cookies, headers } from 'next/headers';



export async function getBlogPostDetail(blog_post_id){
    if(blog_post_id){
        const cookieStore = cookies();
        const headersList = headers();

        const hostname = (headersList.get('host')||'').split(':')?.[0]


        const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/blog_post/${blog_post_id}/retrieve/`,
        { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
                'Next-Server-Origin': hostname

            },
            // cache: 'no-store' ,
            next: { revalidate: 600 }
            // cache:'force-cache'
         });
    
        return res.json();
    }
}


export async function searchBlogPosts(searchParams) {

    const cookieStore = cookies();
    const headersList = headers();

    const hostname = (headersList.get('host')||'').split(':')?.[0]

    const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/blog_post/search/?filter_categories=${searchParams?.categories||''}&filter_tags=${''}&keyword=${searchParams?.keyword||''}&order_by=${''}&page=${searchParams?.page||1}`,
    { 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
            'Next-Server-Origin': hostname

        },
        // cache: 'no-store' ,
        next: { revalidate: 600 }
        // cache:'force-cache'
    });

    return res.json();
}
