/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  createPage({
    path: "/",
    component: path.resolve("./src/templates/blog-index.js"),
  })
  result.data.allMarkdownRemark.edges.forEach(({ node }, i) => {
    const next =
      i === result.data.allMarkdownRemark.edges.length - 1
        ? null
        : result.data.allMarkdownRemark.edges[i + 1].node
    const previous =
      i === 0 ? null : result.data.allMarkdownRemark.edges[i - 1].node
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
        previous,
        next,
      },
    })
  })
}
