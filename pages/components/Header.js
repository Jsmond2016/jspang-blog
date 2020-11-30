/*
 * @Description: 
 * @Date: 2020-11-26 14:28:58
 * @Author: Jsmond2016 <jsmond2016@gmail.com>
 * @Copyright: Copyright (c) 2020, Jsmond2016
 */

import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import '../../static/style/components/header.css'
import servicePath from '../../config/apiUrl'
import axios from 'axios'
import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {

	const [navArray, setNavArray] = useState([])
	useEffect(() => {

		const fetchData = async () => {
			const result = await axios(servicePath.getTypeInfo).then(
				(res) => {
					setNavArray(res.data.data)
					return res.data.data
				}
			)
			setNavArray(result)
		}
		fetchData()


	}, [])

	//跳转到列表页
	const handleClick = (e) => {
		if (e.key == 0) {
			Router.push('/index')
		} else {
			Router.push('/list?id=' + e.key)
		}


	}

	return (
		<div className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={10} xl={10}>
					<span className="header-logo">
						<Link href={{ pathname: '/index' }}>
							<a> 技术胖</a>
						</Link></span>
					<span className="header-txt">专注前端开发,每年100集免费视频。</span>
				</Col>

				<Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
					<Menu mode="horizontal" onClick={handleClick}>
						<Menu.Item key="home">
							<Icon type="home" />
                  首页
              </Menu.Item>
						{
							navArray.map((item) => {
								return (
									<Menu.Item key={item.Id}>
										<Icon type={item.icon} />
										{item.type_name}
									</Menu.Item>
								)
							})
						}
					</Menu>
				</Col>
			</Row>
		</div>
	)
}


export default Header