import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'

import Header from './components/Header'
import Author from './components/Author'
import Advert from './components/Advert'
import Footer from './components/Footer'
import '../static/style/pages/detailed.css'

import axios from 'axios'
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked'
import highLight from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from './components/tocify.tsx'
import servicePath from '../config/apiUrl'
import {
  FolderOutlined,
  CalendarOutlined,
  FireOutlined
} from '@ant-design/icons';
import { DEFAULT_DATE_FORMAT } from '../utils'
import moment from 'moment'
import 'github-markdown-css/github-markdown.css'
import 'prismjs/themes/prism-okaidia.css'
// import Prism from 'prismjs'

const Detail = (props) => {

  const { article = {} } = props

  const [myMyarticle, setMyarticle] = useState(article);

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return highLight.highlightAuto(code).value;
      // return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  });

  let html = marked(myMyarticle.articleContent)


  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

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
                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                <Breadcrumb.Item>{myMyarticle.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {myMyarticle.title}
              </div>

              <div className="list-icon center">
                <span><CalendarOutlined style={{ padding: '0 2px' }} /> {moment(myMyarticle.addTime).format(DEFAULT_DATE_FORMAT)} </span>
                <span><FolderOutlined style={{ padding: '0 2px' }} /> {myMyarticle.typeName} </span>
                <span><FireOutlined style={{ padding: '0 2px' }} /> {myMyarticle.viewCount} 人</span>
              </div>

              <div className="detailed-content markdown-body" dangerouslySetInnerHTML={{ __html: html }} />

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
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

    axios(servicePath.getArticleById + id).then(
      (res) => {
        resolve({ article: res.data.data[0] })
      }
    )
  })

  return await promise
}

export default Detail