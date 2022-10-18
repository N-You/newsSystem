import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import './index.sass'
import { icons } from 'antd/lib/image/PreviewGroup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getList, MenuItem } from '@/utils/getMenu'

const { Sider } = Layout

export default function SideMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const handeMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/rights?_embed=children')
        const data = getList(res.data)
        setMenu(data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        onClick={handeMenu}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={menu}
      />
    </Sider>
  )
}
