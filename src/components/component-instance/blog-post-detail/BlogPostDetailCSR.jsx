

import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect} from "react";
import clsx from "clsx";


import _BlogPostDetail from './_BlogPostDetail'

import {user_retrieve_blog_post} from '../../../api/blog_post'
const BlogPostDetailCSR = ({  
    template_nodes, node,  mode, actions, children, hierarchy, ...props}) => {


    const [blogPost, setBlogPost] = useState(null)

    useEffect(()=>{

        // console.log(actions?.getStoreUUID())
        // console.log(actions)
        if( blogPost===null && actions?.getStoreUUID() && node?.data?.preview_data?.uuid){
            user_retrieve_blog_post(actions?.getStoreUUID(), node?.data?.preview_data?.uuid).then(res=>{
                console.log(res.data)
                setBlogPost(res.data)
            })
        }
        
    },[blogPost, actions, node?.data?.preview_data])


        return (
            <Fragment>
              <_BlogPostDetail 
                blogPost={blogPost}
                mode={mode}
                {...props}
              />


            </Fragment>
          )

};

BlogPostDetailCSR.propTypes = {
};

export default BlogPostDetailCSR;


