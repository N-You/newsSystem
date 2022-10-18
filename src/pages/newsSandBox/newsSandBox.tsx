import axios from 'axios'
import React, { useEffect } from 'react'
import './newsSandBox.sass'

import SideMenu from '@/commponents/layout/SideMenu/SideMenu'
import TopHeader from '@/commponents/layout/TopHeader/TopHeader'

import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export default function newsSandBox() {
  // useEffect(() => {
  //   axios.get('/api/mmdb/movie/v3/list/hot.json?ct=%E5%B9%BF%E5%B7%9E&ci=20&channelId=4').then((res) => {
  //     console.log(res)
  //   })13
  // }, [])
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout>
        <TopHeader></TopHeader>
        <Content
          className="content-style"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
