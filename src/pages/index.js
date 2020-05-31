import React from "react"


import Layout from "../components/layout"

import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from './../components/Post'

const IndexPage = () => (
  <Layout>
    <SEO title="Home page" />
    <h1>Home page</h1>
    <StaticQuery query={indexQuery} render={data=>{
      return (
        <div>
          {data.allMarkdownRemark.edges.map(({node})=> (
            <Post key={node.frontmatter.path}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            path={node.frontmatter.path}
            date={node.frontmatter.date}
            body={node.excerpt}/>
          ))}
        </div>
      )
    }}/>
  </Layout>
)

const indexQuery = graphql`
query title {
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "MMM Do YYYY")
          author
          path
        }
        excerpt
      }
    }
  }
}  
`

export default IndexPage
