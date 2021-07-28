/** @jsx jsx */
import { jsx } from "@emotion/react"
import profilePic from "../assets/profile-pic.png"
import { rhythm } from "../utils/typography"

const Bio = () => {
  return (
    <div
      css={{
        // display: "flex",
        marginBottom: rhythm(2),
        textAlign: "left",
      }}
    >
      <img
        src={profilePic}
        alt={`Hulk`}
        css={{
          marginRight: rhythm(1 / 2),
          marginBottom: rhythm(1),
          width: rhythm(5),
          // height: rhythm(2),
          borderRadius: "50%",
        }}
      />
      <div
        css={{
          textAlign: "left",
        }}
      >
        <p>
          我叫黄铂文
          (Hulk)，1997年出生于北京。热爱编程，前端。喜欢打篮球以及其他一切户外运动。2013年起学习编程，2015年
          "入坑" 前端至今。
        </p>
        <p>
          2020年毕业于「河北北方学院」。目前第一份工作在智谱华章做前端开发工程师。技术栈：JavaScript
          HTML Css React 等。
        </p>
        <p>
          目前阶段的目标是成为某个领域内的专家{" "}
          <span
            css={{
              textDecoration: "line-through",
            }}
          >
            or
          </span>{" "}
          (and) 创造出高体验、高价值的产品。
        </p>
        <p>
          开发这个博客的原因是要对知识点进行总结和分享，梳理自己的知识体系并且产出，也希望可以思考和经验分享给所有人。
        </p>
      </div>
    </div>
  )
}

export default Bio
