import React from "react"
import { Link, graphql } from "gatsby"
import get from "lodash/get"
import { rhythm, scale } from "../utils/typography"
import { formatPostDate, formatReadingTime } from "../utils/helpers"

import Layout from "../components/Layout"
import Bio from "../components/Bio"
import Seo from "../components/Seo"

//系统字体
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`

const BlogPostTemplate = props => {
  const post = get(props, "data.markdownRemark")
  const { previous, next } = get(props, "pageContext")

  return (
    <Layout path={props.path}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.spoiler}
        slug={post.fields.slug}
      />
      <main>
        <article>
          <header>
            <h2
              style={{
                color: "var(--textTitle)",
                fontSize: rhythm(1.1),
                lineHeight: rhythm(1.3),
              }}
            >
              {post.frontmatter.title}
            </h2>
            <p
              style={{
                ...scale(-1 / 5),
                display: "block",
                marginBottom: rhythm(1),
                marginTop: rhythm(-4 / 5),
              }}
            >
              {formatPostDate(post.frontmatter.date)}
              {` • ${formatReadingTime(post.timeToRead)}`}
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
      <aside>
        <div
          style={{
            margin: "90px 0 40px 0",
            fontFamily: systemFont,
          }}
        >
          {/* <Signup cta={post.frontmatter.cta} /> */}
        </div>
        <Bio />
        <nav>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={previous.fields.slug}
                  rel="prev"
                  style={{ marginRight: 20 }}
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
      }
    }
  }
`
