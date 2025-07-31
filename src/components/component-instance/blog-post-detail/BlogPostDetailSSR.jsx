
import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";


import _BlogPostDetail from './_BlogPostDetail'

import {getBlogPostDetail} from '../../../fetch/blog'
const BlogPostDetailSSR = async({  
    params, searchParams, template_nodes, node,  mode, actions, children, hierarchy, ...props}) => {


        const blogPost = await getBlogPostDetail(params?.object_id)

        return (
            <Fragment>
              <_BlogPostDetail 
                params={params}
                searchParams={searchParams}
                blogPost={blogPost}
                mode={mode}
                actions={actions}
                {...props}
              />


            </Fragment>
          )

};

BlogPostDetailSSR.propTypes = {
};

export default BlogPostDetailSSR;


