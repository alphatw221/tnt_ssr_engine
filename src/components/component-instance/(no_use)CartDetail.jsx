// "use client"
// import PropTypes from "prop-types";
// import React, { Fragment, useState, useEffect } from "react";
// import clsx from "clsx";

// import { useAppSelector } from "@/redux/hooks";    
// import CartKingPork from "../../KPpages/other/(no_use)CartKingPork";

// const CartDetail = ({  
//     node,  mode, actions, update, children, ...props}) => {

  
//     const [width, setWidth] = useState('')
//     const websiteEditorState = useAppSelector((state) => state.website_editor);

//     const [isHover, setIsHover] = useState(false)



//     useEffect(()=>{
//             if(websiteEditorState.sideMenuActive){
//                 setWidth('80vw')
//             }else{
//                 setWidth('100vw')
//             }

//     },[websiteEditorState.sideMenuActive, setWidth])

    
//     return (
        
//         <div 
        
//             id={props?.id}
//             className={
//                 clsx(
//                     props?.className,

//                 )}

//             style={{
//                 ...props?.style||{},
//                 width:width,
//                 maxWidth:(node?.data?.max_width||'')+(node?.data?.max_width?node?.data?.max_width_unit:''),

//             }}>
//             <CartKingPork/>
//             {children}
//         </div>)
// };

// CartDetail.propTypes = {
// };

// export default CartDetail;




