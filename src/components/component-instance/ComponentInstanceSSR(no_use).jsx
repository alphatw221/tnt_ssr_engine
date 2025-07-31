// // import PropTypes from "prop-types";
// import { Fragment } from "react";
// import style from "./ComponentInstanceSSR.module.scss"


// import ShopGridPreLoader from "./ShopGridPreLoader"
// import ShopSideBarPreLoader from "./ShopSideBarPreLoader";
// import ProductDetailPreLoader from "./ProductDetailPreLoader"
// import BlogPostDetailPreLoader from "./BlogPostDetailPreLoader"
// import BlogGridPreLoader from "./BlogGridPreLoader"
// import BlogSideBarPreLoader from "./BlogSideBarPreLoader"

// import { cookies, headers } from 'next/headers';
// import { Providers, PersistProvider, myDndProvider } from '../../redux/provider'
// import SSRComponentGrid3D from "../component-matrix(no_use)/SSRComponentGrid3D"

// async function getShopProducts(searchParams) {

//     const cookieStore = cookies();
//     const headersList = headers();

//     // process.env.API_PROTOCAL
//     // process.env.API_HOSENAME
//     // process.env.API_PORT
//     const hostname = (headersList.get('host')||'').split(':')?.[0]

//     const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product/search/?filter_categories=${searchParams?.categories||''}&filter_tags=${searchParams?.tags||''}&keyword=${searchParams?.keyword||''}&order_by=${['undefined', '', null, undefined].includes(searchParams?.order_by)?'priority,updated_at':searchParams?.order_by}&page=${searchParams?.page||1}`,
//     { 
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//             'Host': hostname

//         },
//         // cache: 'no-store' ,
//         next: { revalidate: 600 }
//         // cache:'force-cache'
//     });

//     return res.json();
// }

// async function searchProducts(ids, tags){
//     const cookieStore = cookies();
//     const headersList = headers();
//     const hostname = (headersList.get('host')||'').split(':')?.[0]

//     const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product/search/?filter_ids=${ids}&filter_categories=${''}&filter_tags=${tags}&keyword=${''}&order_by=${'priority,updated_at'}&page=${1}`,
//     { 
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//             'Host': hostname

//         },
//         next: { revalidate: 600 }
//     });

//     return res.json();
// }
// async function getShopCategory() {

//     const cookieStore = cookies();
//     const headersList = headers();

//     const hostname = (headersList.get('host')||'').split(':')?.[0]

//     const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product_category/search/?keyword=${''}&page=${1}`,
//     { 
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//             'Host': hostname

//         },
//         // cache: 'no-store' ,
//         next: { revalidate: 600 }
//         // cache:'force-cache'
//     });

//     return res.json();
// }

// async function getProductDetail(product_id) {

//     if(!['','undefined','null', null, undefined].includes(product_id)){

//         const cookieStore = cookies();
//         const headersList = headers();

//         const hostname = (headersList.get('host')||'').split(':')?.[0]


//         const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/product/${product_id}/retrieve/`,
//         { 
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//                 'Host': hostname

//             },
//             cache: 'no-store' ,
//             // next: { revalidate: 600 }
//             // cache:'force-cache'
//          });
    
//         return res.json();
//     }
   
// }
// async function getBlogPosts(searchParams) {

//     const cookieStore = cookies();
//     const headersList = headers();

//     const hostname = (headersList.get('host')||'').split(':')?.[0]

//     const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/blog_post/search/?filter_categories=${searchParams?.categories||''}&filter_tags=${''}&keyword=${searchParams?.keyword||''}&order_by=${''}&page=${searchParams?.page||1}`,
//     { 
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//             'Host': hostname

//         },
//         // cache: 'no-store' ,
//         next: { revalidate: 600 }
//         // cache:'force-cache'
//     });

//     return res.json();
// }

// async function getBlogPostDetail(blog_post_id){
//     if(blog_post_id){
//         const cookieStore = cookies();
//         const headersList = headers();

//         const hostname = (headersList.get('host')||'').split(':')?.[0]


//         const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/blog_post/${blog_post_id}/retrieve/`,
//         { 
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//                 'Host': hostname

//             },
//             // cache: 'no-store' ,
//             next: { revalidate: 600 }
//             // cache:'force-cache'
//          });
    
//         return res.json();
//     }
// }

// async function getBlogCategories() {

//     const cookieStore = cookies();
//     const headersList = headers();

//     const hostname = (headersList.get('host')||'').split(':')?.[0]

//     const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/blog_post_category/search/?keyword=${''}&page=${1}`,
//     { 
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//             'Host': hostname

//         },
//         // cache: 'no-store' ,
//         next: { revalidate: 600 }
//         // cache:'force-cache'
//     });

//     return res.json();
// }

// async function searchSlidersWithTags(tags) {
//     if(tags){
//         const cookieStore = cookies();
//         const headersList = headers();

//         const hostname = (headersList.get('host')||'').split(':')?.[0]

//         const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/slider/search/?tags=${tags}&order_by=priority,updated_at`,
//         { 
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//                 'Host': hostname

//             },
//             // cache: 'no-store' ,
//             next: { revalidate: 600 }
//             // cache:'force-cache'
//          });
    
//         return res.json();
//     }
   
// }

// async function searchBannerWithTags(tags) {
//     if(tags){
//         const cookieStore = cookies();
//         const headersList = headers();

//         const hostname = (headersList.get('host')||'').split(':')?.[0]

//         const res = await fetch(`${process.env.API_PROTOCAL}://${process.env.API_HOSTNAME}${process.env.API_PORT?':'+process.env.API_PORT:''}/api/v1/store/banner/search/?tags=${tags}`,
//         { 
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${cookieStore.get('customer_access_token')?.value}`,
//                 'Host': hostname

//             },
//             // cache: 'no-store' ,
//             next: { revalidate: 600 }
//             // cache:'force-cache'
//          });
    
//         return res.json();
//     }
   
// }

// const ComponentInstanceSSR = async ({ params, searchParams, component, SSRElementId}) => {
    

//     switch(component.type){
//         case 'component_box':
//             return (<div id={SSRElementId} className={style['ssr-component']}>
//                         <SSRComponentGrid3D params={params} searchParams={searchParams} parent={component} mode='prod'/>
//                     </div>)
//         case 'side_bar':
//             return (<div id={SSRElementId} className={style['ssr-component']}>
//                         <SSRComponentGrid3D params={params} searchParams={searchParams} parent={component} mode='prod'/>
//                     </div>)
//         case 'hover_box':
//             return (
//                 <div id={SSRElementId} className={style['ssr-component']}>
//                     <h3>{component?.top_text||''}</h3>
//                     <img src={component?.image}/>
//                     <h3>{component?.bottom_text||''}</h3>
//                 </div>
//             )
//         case 'absolute_position_component_box':
//             return (
//                 <div id={SSRElementId} className={style['ssr-component']}>
//                     {(component?.components||[]).map((_component, i)=>(
//                         <ComponentInstanceSSR key={i} params={params} searchParams={searchParams} component={_component}/>
//                     ))}
//                 </div>
//             )
//         case 'marquee':
//             return ( <h3 id={SSRElementId} className={style['ssr-component']}>
//                 {component?.context}
//             </h3>)
//         case 'image':
//             return (<img id={SSRElementId} src={component?.image} className={style['ssr-component']}/>)
//         case 'text':
//             return (
//                 <h3 id={SSRElementId} className={style['ssr-component']}>
//                     {component?.text}
//                 </h3>
//             )    
//         case 'empty_box':
//             return (
//                 <div id={SSRElementId} className={style['ssr-component']}></div>    
//             )   
//         // case 'dropdown_list':
//         //     return (<DropDownList 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'slider':
//             if(!component?.tags) return null
//             const data = await searchSlidersWithTags(component?.tags||'')
//             // console.log(data)
//             return (<Fragment>
//                 <div id={SSRElementId} className={style['ssr-component']}>
//                     {(data?.rasults||[]).map((slider,i)=>(
//                         <div key={i}>
//                             <h1>{slider?.name||''}</h1>
//                             <h2>{slider?.title||''}</h2>
//                             <h3>{slider?.subtitle||''}</h3>
//                             <h4>{slider?.keyword||''}</h4>
//                             <a href={slider?.url||''}></a>
//                             <button>{slider?.button_text||''}</button>
//                         </div>)
//                     )}
//                 </div>
//             </Fragment>)
//         case 'ck_editor':

//             return (
//                 <p id={SSRElementId} dangerouslySetInnerHTML={{ __html: component.context }} className={style['ssr-component']}></p>
//             )
//             // return (<CKEditor 
//             //     component={component} mode={mode} actions={actions} update={update}/>)        
//         // case 'login_form':
//         //     return (<LoginForm 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         // case 'register_form':
//         //     return (<RegisterForm 
//         //         component={component} mode={mode} actions={actions} update={update}/>)        
     
//         // case 'cart_detail':
//         //     return (<CartDetail 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         // case 'checkout_form':
//         //     return (<CheckoutForm 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         // case 'order_detail':
//         //     return (<OrderDetail 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         // case 'order_payment':
//         //     return (<OrderPayment 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         // case 'my_orders':
//         //     return (<MyOrders 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'login_button':
//             return (<button id={SSRElementId} className={style['ssr-component']} type='button'>
//                 {'登入 Login'}
//             </button>) 
//         // case 'icon':
//         //     return (<Icon 
//         //         component={component} mode={mode} actions={actions} update={update}/>)  
//         case 'hyper_link':
//             return (
//                 <a id={SSRElementId} className={style['ssr-component']}>
//                     {component?.text}
//                 </a>
//             )  
//         case 'navigation_link':
//             return ( 
//                 <a id={SSRElementId} className={style['ssr-component']}>
//                     {component?.text}
//                 </a>
//             )  
//         case 'cart_button':
//             return (<button id={SSRElementId} className={style['ssr-component']} type='button'>
//                     {'我的購物車 My Cart'}
//                 </button>) 
//         case 'product_grid':

//             const products = await searchProducts((component?.data_list||[]).map(data=>data.id).join(','), component?.tags||'')
//             return ( <Fragment>
//                 <div id={SSRElementId} className={style['ssr-component']}>
//                     <h1>商品 Products</h1>
//                     {(products?.results||[]).map((product,index)=>
//                         <li key={index}>
//                             <div>
//                                 <h1>{product?.name||''}</h1>
//                                 <h2>{product?.short_name||''}</h2>
//                                 <div><label>價錢 Price</label><h3>{product?.price||''}</h3></div>
//                                 <div><label>折扣價 Discount Price</label><h3>{product?.discount_price||''}</h3></div>
//                                 <p>{product?.description}</p>
//                                 <p dangerouslySetInnerHTML={{ __html: product?.content||'' }}></p>
//                             </div>
//                         </li>
//                     )}
                  
//                 </div>
//             </Fragment>) 
//         case 'shop_grid':
            
//             var productData = await getShopProducts(searchParams)
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                             {/* <myDndProvider> */}

//                                 <ShopGridPreLoader products={productData.results} totalRecords={productData.count}/>
//                             {/* </myDndProvider> */}

//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>商品 Products</h1>
//                         {(productData?.results||[]).map((product,index)=>
//                             <li key={index}>
//                                 <div>
//                                     <h1>{product?.name||''}</h1>
//                                     <h2>{product?.short_name||''}</h2>
//                                     <div><label>價錢 Price</label><h3>{product?.price||''}</h3></div>
//                                     <div><label>折扣價 Discount Price</label><h3>{product?.discount_price||''}</h3></div>
//                                     <p>{product?.description}</p>
//                                     <p dangerouslySetInnerHTML={{ __html: product?.content||'' }}></p>
//                                 </div>
//                             </li>
//                         )}
                      
//                     </div>
//                 </Fragment>
//             )
//         case 'shop_gallery':
            
//             var productData = await getShopProducts(searchParams)
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                             {/* <myDndProvider> */}

//                                 <ShopGridPreLoader products={productData.results} totalRecords={productData.count}/>
//                             {/* </myDndProvider> */}

//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>商品 Products</h1>
//                         {(productData?.results||[]).map((product,index)=>
//                             <li key={index}>
//                                 <div>
//                                     <h1>{product?.name||''}</h1>
//                                     <h2>{product?.short_name||''}</h2>
//                                     <div><label>價錢 Price</label><h3>{product?.price||''}</h3></div>
//                                     <div><label>折扣價 Discount Price</label><h3>{product?.discount_price||''}</h3></div>
//                                     <p>{product?.description}</p>
//                                     <p dangerouslySetInnerHTML={{ __html: product?.content||'' }}></p>
//                                 </div>
//                             </li>
//                         )}
                      
//                     </div>
//                 </Fragment>
//             )

//         case 'shop_side_bar':
            
//             const categoryData = await getShopCategory()
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                             {/* <myDndProvider> */}
//                                 <ShopSideBarPreLoader categories={categoryData.results} totalRecords={categoryData.count}/>
//                             {/* </myDndProvider> */}

//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>商品類別 Product Category</h1>
//                         <ul>
//                         {(categoryData?.results||[]).map((category, index)=>
//                             <li key={index}>
//                                 <h1>{category.name}</h1>
//                             </li>
//                         )}
//                         </ul>
                      
//                     </div>
//                 </Fragment>
//             )
//         case 'product_detail':
//             const product = await getProductDetail(params?.object_id)
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                                 <ProductDetailPreLoader product={product} />
//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>

//                         <h1>{product?.name||''}</h1>
//                         <h2>{product?.short_name||''}</h2>
//                         <div><label>價錢 Price</label><h3>{product?.price||''}</h3></div>
//                         <div><label>折扣價 Discount Price</label><h3>{product?.discount_price||''}</h3></div>
//                         <p>{product?.description}</p>
//                         <p dangerouslySetInnerHTML={{ __html: product?.content||'' }}></p>
//                     </div>
//                 </Fragment>
//             )
//         case 'blog_grid':
//             const blogPosts = await getBlogPosts(searchParams)
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                                 <BlogGridPreLoader blogPosts={blogPosts.results} totalRecords={blogPosts.count}/>
//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>文章 BlogPosts</h1>
//                         {(blogPosts?.results||[]).map((blogPost,index)=>
//                             <li key={index}>
//                                 <div>
//                                     <h1>{blogPost?.title||''}</h1>
//                                     <h2>{blogPost?.subtitle||''}</h2>
//                                     <p>{blogPost?.description||''}</p>
//                                     <p dangerouslySetInnerHTML={{ __html: blogPost?.content||'' }}></p>

//                                 </div>
//                             </li>
//                         )}
                      
//                     </div>
//                 </Fragment>
//             )
//         case 'blog_side_bar':
//             const categories = await getBlogCategories()
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                                 <BlogSideBarPreLoader categories={categories.results} totalRecords={categories.count}/>
//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>文章類別 Blog Post Category</h1>
//                         <ul>
//                         {(categories?.results||[]).map((category, index)=>
//                             <li key={index}>
//                                 <h1>{category.name}</h1>
//                             </li>
//                         )}
//                         </ul>
//                     </div>
//                 </Fragment>
//             )
//         case 'blog_post_detail':
//             const blogPost = await getBlogPostDetail(params?.object_id)
//             return (
//                 <Fragment>
//                     <Providers>
//                         <PersistProvider>
//                                 <BlogPostDetailPreLoader blogPost={blogPost} />
//                         </PersistProvider>
//                     </Providers>

//                     <div id={SSRElementId} className={style['ssr-component']}>
//                         <h1>{blogPost?.title||''}</h1>
//                         <h2>{blogPost?.subtitle||''}</h2>
//                         <ul>{(blogPost?.tags||[]).map((tag,i)=>(<li key={i}>{tag}</li>))}</ul>
//                         <p>{blogPost?.description||''}</p>
//                         <p dangerouslySetInnerHTML={{ __html: blogPost?.content||'' }}></p>
//                     </div>
//                 </Fragment>
//             )
//         default:
//             return (<div id={SSRElementId} className={style['ssr-component']}>{component.type}</div>)

//     }

// };

// ComponentInstanceSSR.propTypes = {


// };

// export default ComponentInstanceSSR;
