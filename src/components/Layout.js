/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
/** @jsx jsx */
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import { jsx } from "@emotion/react"

import { rhythm, scale } from "../utils/typography"

const AnchorLink = txt => (
  <h5
    css={{
      ...scale(0.75),
      lineHeight: "1.5",
      fontSize: "20px",
      borderBottom: "1.2px solid var(--textHeader)",
      marginRight: 18,
      marginBottom: 0,
      marginTop: 0,
    }}
  >
    <Link
      css={{
        boxShadow: "none",
        textDecoration: "none",
        color: "var(--textHeader)",
      }}
      to={`/#${txt}`}
    >
      {txt}
    </Link>
  </h5>
)

const Layout = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      css={{
        color: "var(--textNormal)",
        background: "var(--bg)",
        transition: "color 0.2s ease-out, background 0.2s ease-out",
        minHeight: "100vh",
      }}
    >
      <div
        css={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: rhythm(24),
          padding: `2.625rem ${rhythm(3 / 4)}`,
        }}
      >
        <header
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2.625rem",
          }}
        >
          <h2
            css={{
              ...scale(0.75),
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            <Link
              css={{
                boxShadow: "none",
                textDecoration: "none",
                color: "var(--textTitle)",
                fontSize: path === "/" ? rhythm(1) : rhythm(1 / 1.2),
              }}
              to={"/"}
            >
              {data.site.siteMetadata?.title || `Title`}
            </Link>
          </h2>
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {["文章", "笔记"].map(type => AnchorLink(type))}
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
