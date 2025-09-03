
import PropTypes from "prop-types";
import React, { Fragment} from "react";
import clsx from "clsx";


import _BlogPostDetail from './_BlogPostDetail'

// import {getBlogPostDetail} from '../../../fetch/blog'
// import { customer_retrieve_blog_post } from '@/api/blog_post'

const BlogPostDetailSSR = ({  

    
    
    element, 
    elementProps,
    mode,
    actions,
    object,
    ...props}) => {



        return (
            <Fragment>

              <_BlogPostDetail 
                element={element}
                elementProps={elementProps}
                blogPost={object}
                mode={mode}
                {...props}
              />

            </Fragment>
          )

};

BlogPostDetailSSR.propTypes = {
};

export default BlogPostDetailSSR;


