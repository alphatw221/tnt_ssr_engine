

import { cookies, headers } from 'next/headers';



export async function getProductDetail(product_uuid) {

    if(!['','undefined','null', null, undefined].includes(product_uuid)){

        const cookieStore = cookies();
        const headersList = headers();

        const hostname = (headersList.get('host')||'').split(':')?.[0]


        const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product/${product_uuid}/retrieve/`,
        { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
                'Next-Server-Origin': hostname

            },
            cache: 'no-store' ,
            // next: { revalidate: 600 }
            // cache:'force-cache'
         });
    
        return res.json();
    }
   
}


export async function searchProducts(ids, tags, categories){
    const cookieStore = cookies();
    const headersList = headers();
    const hostname = (headersList.get('host')||'').split(':')?.[0]

    const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product/search/?filter_ids=${ids}&filter_categories=${categories}&filter_tags=${tags}&keyword=${''}&order_by=${'priority,updated_at'}&page=${1}`,
    { 
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
            'Next-Server-Origin': hostname

        },
        next: { revalidate: 600 }
    });

    return res.json();
}
