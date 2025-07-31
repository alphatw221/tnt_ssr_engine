import React, { Fragment } from "react";
import Link from 'next/link'
const BlogPostSingle = ({blogPost, component, props})=>{




    return (
    <Fragment>
        <div className={true?"col-lg-4 col-md-6 col-sm-12":"col-lg-6 col-md-6 col-sm-12"}>
        <div className="blog-wrap-2 mb-30">
          <div className="blog-img-2">
            <Link href={ `/blog_post/${blogPost?.id}`}>
              <img
                src={ blogPost?.image}
                alt=""
              />
            </Link>
          </div>
          <div className="blog-content-2">
            <div className="blog-meta-2">
              <ul>
                <li>
                  {new Date(blogPost?.created_at).toLocaleDateString()}
                </li>
                <li>
                  <Link href={ `/blog_post/${blogPost?.id}`}>
                    {(blogPost?.comments||[]).length} <i className="fa fa-comments-o" />
                  </Link>
                </li>
              </ul>
            </div>
            <h4>
              <Link href={ `/blog_post/${blogPost?.id}`}>
                {blogPost?.title}
              </Link>
            </h4>
            <p>
              {blogPost?.description}
            </p>
            <div className="blog-share-comment">
              <div className="blog-btn-2">
                <Link href={ `/blog_post/${blogPost?.id}`}>
                  更多 read more
                </Link>
              </div>
              {/* <div className="blog-share">
                <span>share :</span>
                <div className="share-social">
                  <ul>
                    <li>
                      <a className="facebook" href="//facebook.com">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a className="twitter" href="//twitter.com">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a className="instagram" href="//instagram.com">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    )
}


export default BlogPostSingle;
