import React from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import './index.sass'
import { icons } from 'antd/lib/image/PreviewGroup'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuProps['items'] = [
  getItem('首页', '/home', <UserOutlined />),
  getItem('用户管理', '/user-manage', <UserOutlined />, [
    getItem('用户列表', '/user-manage/list', <UserOutlined />)
  ]),
  getItem('权限管理', '/right-manage', <AppstoreOutlined />, [
    getItem('角色列表', '/right-manage/role/list', <UserOutlined />),
    getItem('权限列表', '/right-manage/right/list', <UserOutlined />)
  ])
]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

export default function SideMenu() {
  const navigate = useNavigate()
  const handeMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        onClick={handeMenu}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </Sider>
  )
}
