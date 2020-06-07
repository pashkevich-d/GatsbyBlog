const {slugify} = require('./src/util/utility')
const path = require('path')
const authors = require('./src/templates/authors')

exports.onCreateNode = ({node, actions}) => {
    const {createNodeField} = actions
    if(node.internal.type === "MarkdownRemark") {
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name: "slug",
            value: slugFromTitle
        })
    }
}

exports.createPages = ({actions, graphql}) => {
    const {createPage} = actions
    const singlePostTemplate = path.resolve('./src/templates/single-post.js')

    return graphql(`
        {
            allMarkdownRemark{
                edges{
                    node{
                        frontmatter {
                            author
                        }
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(res=> {
        if(res.errors) return Promise.reject(res.errors)
        const posts = res.data.allMarkdownRemark.edges
        posts.forEach(({node})=> {
            createPage({
                path: node.fields.slug,
                component: singlePostTemplate,
                context: {
                    slug: node.fields.slug,
                    imageUrl: authors.find(x=> x.name === node.frontmatter.author).imageUrl
                }
            })
        })
    })
}