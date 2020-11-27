import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import ReactMarkdown from 'react-markdown'

import Header from './components/Header'
import Author from './components/Author'
import Advert from './components/Advert'
import Footer from './components/Footer'
import '../static/style/pages/detailed.css'
import markdown from './markdown'

import axios from 'axios'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';

const Detail = (article) => {

  const [myMyarticle, setMyarticle] = useState(article.data);

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                React实战视频教程-技术胖Blog开发(更新08集)
                </div>

              <div className="list-icon center">
                <span><Icon type="calendar" />{myMyarticle.addTime}</span>
                <span><Icon type="folder" /> 视频教程</span>
                <span><Icon type="fire" /> {viewCount}人</span>
              </div>

              <div className="detailed-content" >
                <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                />
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={markdown}
                ordered={false}
              />
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />

    </>
  )
}

Detail.getInitialProps = async (context) => {

  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
      (res) => {
        console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detail