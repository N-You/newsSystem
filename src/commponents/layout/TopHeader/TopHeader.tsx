import React, { useState } from 'react'
import { Avatar, Dropdown, Layout, Menu, MenuProps } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    role: { roleName },
    username
  } = JSON.parse(localStorage.getItem('token')!)
  const navigator = useNavigate()

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleMenu: MenuProps['onClick'] = ({ key }) => {
    if (key === '2') {
      console.log(111)

      localStorage.removeItem('token')
      navigator('/login', { replace: true })
    }
  }

  const menu = (
    <Menu
      onClick={handleMenu}
      items={[
        {
          key: '1',
          label: roleName
        },
        {
          key: '2',
          danger: true,
          label: '退出'
        }
      ]}
    />
  )

  return (
    <Header style={{ padding: '0 16px', backgroundColor: 'white' }}>
      <div>
        {collapsed ? (
          <MenuUnfoldOutlined onClick={changeCollapsed} />
        ) : (
          <MenuFoldOutlined onClick={changeCollapsed} />
        )}

        <div style={{ float: 'right' }}>
          <span>
            欢迎<span style={{ color: 'red' }}>{username}</span>回来
          </span>
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
