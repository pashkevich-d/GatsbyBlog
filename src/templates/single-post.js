import React from 'react';
import Layout from '../components/layout';
import {graphql, Link} from 'gatsby';
import SEO from '../components/seo'
import {  Card , CardBody, CardSubtitle, Badge} from 'reactstrap';
import Img from 'gatsby-image'
import {slugify} from '../util/utility'
import authors from './authors'
import {DiscussionEmbed} from 'disqus-react'

const SinglePost = ({data, pageContext}) => {
    const post = data.markdownRemark.frontmatter
    const author = authors.find(x=> x.name === post.author)
    const baseUrl = 'https://pashkevich-dmitry.by/'
    const disqusShortName = 'pashkevich-d'
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
    }
    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
            <SEO title={post.title} />
                    <Card>
                        <Img className="card-image-top" fluid={post.image.childImageSharp.fluid}/>
                        <CardBody>
                            <CardSubtitle>
                                <span className="text-info">
                                    {post.date}
                                </span> by {' '}
                                <span className="text-info">
                                    {post.author}
                                </span>
                            </CardSubtitle>
                            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}}>
                                    
                            </div>
                            <ul className="post-tags">
                                {post.tags.map(tag=> {
                                    return (
                                        <li key={tag}>
                                            <Link to={`/tag/${slugify(tag)}`}>
                                                <Badge color="primary">
                                                    {tag}
                                                </Badge>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </CardBody>
                    </Card>
                    <h3 className="text-center">Share this post</h3>
                    <div className="text-center social-share-links">
                            <ul>
                                <li>
                                    <a className="facebook" target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/sharer/sharer.php?u=" + baseUrl +pageContext.slug}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="twitter" target="_blank" rel="noopener noreferrer" href={"https://twitter.com/share?url=" + baseUrl +pageContext.slug + "&text=" + post.title + "&via" + "twitterHandle"} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"/></svg>
                                    </a>
                                </li>
                                <li>
                                    <a className="linkedin" target="_blank" rel="noopener noreferrer" href={"https://www.linkedin.com/shareArticle?url=" + baseUrl +pageContext.slug}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </a>
                                </li>
                            </ul>
                    </div>
                    <DiscussionEmbed shortname={disqusShortName} config={disqusConfig}/>
        </Layout>
    );
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!, $imageUrl: String!){
        markdownRemark(fields: {slug: {eq: $slug}}){
            id
            html
            frontmatter {
                title
                author
                date(formatString: "MMM Do YYYY")
                tags
                image {
                    childImageSharp{
                        fluid(maxWidth: 700){
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        file(relativePath: {eq: $imageUrl}){
            childImageSharp{
                fluid(maxWidth: 300){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default SinglePost;
