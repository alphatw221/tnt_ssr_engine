import { NextResponse } from 'next/server';



export function middleware(request){
    console.log('middleware')
    console.log(request)
}





// export const config = {
//     matcher: '*',
//   };