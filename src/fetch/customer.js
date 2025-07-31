

import { cookies, headers } from 'next/headers';
// import _Website from "./_Website"

export async function customerGetStoreData() {

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



export async function customerGetAccount() {
    const cookieStore = cookies();
    if(cookieStore.get('customer_access_token')?.value){

        const headersList = headers();

        const hostname = (headersList.get('host')||'').split(':')?.[0]


        const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/auth/customer/account/`,{ 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
                'Next-Client-Host': hostname

            },
            // cache: 'no-store' ,
            next: { revalidate: 600 }
            // cache:'force-cache'
        });

        return res.json();
    }

    
}



export async function customerGetWebpage(pageName, object_uuid) {


    const cookieStore = cookies();
    const headersList = headers();

    const hostname = (headersList.get('host')||'').split(':')?.[0]



    // const res = await fetch(`http://localhost:8000/api/v1/store/customer/webpage//retrieve`,
    // { 
    //     method: 'GET',
    //     headers: {

    //         'Host': 'testtest',
    //         'testtest':'testtest'
    //     },
    // });


    // console.log(res.json())
    try{
        const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/customer/webpage/${pageName}/retrieve?object_uuid=${object_uuid}`,

        // const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/customer/retrieve/web_page/${pageName}/`,
        { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
                'Next-Server-Origin': hostname
            },
            // cache: 'no-store' ,
            next: { revalidate: 600 },
            // cache:'force-cache'
        });

        return res.json();
    }catch(error){
        return {notFound: true};
        console.log(error.message)
        if (error instanceof Error && error.message.includes('404')) {
            console.log('404 not found');
            return {notFound: true};
          }
    }
   
}




export async function customerGetWebpageMeta(pageName) {


    const cookieStore = cookies();
    const headersList = headers();

    const hostname = (headersList.get('host')||'').split(':')?.[0]


    try{
        const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/customer/webpage/${pageName}/retrieve/meta/`,

        { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
                'Next-Server-Origin': hostname
            },
            next: { revalidate: 600 },
        });

        return res.json();
    }catch(error){
        return {notFound: true};
        if (error instanceof Error && error.message.includes('404')) {
            return {notFound: true};
          }
    }
   
}