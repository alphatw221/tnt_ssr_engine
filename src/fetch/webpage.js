

import { cookies, headers } from 'next/headers';
// import _Website from "./_Website"

export async function customerGetWebpage() {

  const cookieStore = cookies();
  const headersList = headers();

  const hostname = (headersList.get('host')||'').split(':')?.[0]


  const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/customer/retrieve/`,
  { 
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
          'Host': hostname
      },
      // cache: 'no-store' ,
      next: { revalidate: 600 },
      // cache:'force-cache'
  });

  return res.json();
}


