import React, { useEffect, useState } from "react"
import get from "lodash/get"
import { rhythm } from "../utils/typography"
import { Link, graphql } from "gatsby"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Bio from "../components/Bio"
import Footer from "../components/Footer"

const BlogIndexTemplate = props => {
  const [blogType, setBlogType] = useState(["文章", "笔记"])
  //文章数据
  const posts = get(props, "data.allMarkdownRemark.edges")

  useEffect(() => {}, [], [])

  return (
    <Layout path={props.path}>
      <Seo />
      <aside>
        <Bio />
      </aside>
      <main>
        {blogType.map(type => (
          <div key={type}>
            <h2
              id={type}
              style={{
                fontSize: rhythm(1.2),
                // marginBottom:'0'
              }}
            >
              {type}
            </h2>
            {posts
              .filter(({ node }) => node.frontmatter?.tags?.includes(type))
              .map(({ node }) => {
                const title = get(node, "frontmatter.title") || node.fields.slug
                return (
                  <article key={node.fields.slug}>
                    <header>
                      <h3
                        style={{
                          // fontFamily: "Montserrat, sans-serif",
                          marginTop: 0,
                          fontSize: rhythm(0.92),
                          marginBottom: rhythm(1 / 4),
                          lineHeight: rhythm(1.3),
                        }}
                      >
                        <Link
                          style={{ boxShadow: "none" }}
                          to={node.fields.slug}
                          rel="bookmark"
                        >
                          {title}
                        </Link>
                      </h3>
                      <small>
                        {formatPostDate(node.frontmatter.date)}
                        {` • ${formatReadingTime(node.timeToRead)}`}
                      </small>
                    </header>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.spoiler,
                      }}
                    />
                  </article>
                )
              })}
          </div>
        ))}
      </main>
      <Footer />
    </Layout>
  )
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
