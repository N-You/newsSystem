import React, { useState } from 'react'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Header } = Layout

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              超级管理员
            </a>
          )
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
          <span>欢迎回来</span>
          <Dropdown overlay={menu}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
