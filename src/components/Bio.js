/*
 * @Author: HuangBoWen
 * @Date: 2021-07-20 17:10:42
 * @LastEditors: HuangBoWen
 * @LastEditTime: 2022-04-11 11:39:47
 * @Description: 
 */
/** @jsx jsx */
import { jsx } from "@emotion/react"
import profilePic from "../assets/profile-pic.jpeg"
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
          我叫☁️艺
          (Hulk)，1997年出生于张家口。热爱教育，历史。平时也会做一些户外运动。2013年起学习编程，2015年
          "入坑" 前端至今。
        </p>
        <p>
          2020年毕业于「河北农业大学」。目前已上岸首都师范大学
        </p>
        <p>
          目前阶段的目标是成为一名人民教师
        </p>
        <p>
          写这个博客的原因是要对知识点进行总结和分享，梳理自己的知识体系并且产出，也希望可以思考和经验分享给所有人。
        </p>
      </div>
    </div>
  )
}

export default Bio
