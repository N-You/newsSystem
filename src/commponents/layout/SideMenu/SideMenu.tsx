import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import './index.sass'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getList, MenuItem } from '@/utils/getMenu'

const { Sider } = Layout

export default function SideMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const handeMenu: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const selectkey = useMemo(() => [location.pathname], [location])
  const openkey = useMemo(
    () => ['/' + location.pathname.split('/')[1]],
    [location]
  )

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
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">全球新闻发布系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            onClick={handeMenu}
            selectedKeys={selectkey}
            defaultOpenKeys={openkey}
            mode="inline"
            theme="dark"
            items={menu}
          />
        </div>
      </div>
    </Sider>
  )
}
