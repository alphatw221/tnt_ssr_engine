

import { cookies, headers } from 'next/headers';


export async function getShopCategory() {

    const cookieStore = cookies();
    const headersList = headers();

    const hostname = (headersList.get('host')||'').split(':')?.[0]

    const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product_category/search/?keyword=${''}&page=${1}`,
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