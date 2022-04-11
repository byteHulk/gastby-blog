import React from "react"

import { rhythm } from "../utils/typography"

const Footer = _ => {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
        textAlign:'center'
      }}
    >
      <p>2019-{new Date().getFullYear()} yunyi's Blog</p>
      <p>
        可通过{" "}
        <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
          rss
        </a>{" "}
        订阅本博客
      </p>
    </footer>
  )
}

export default Footer
