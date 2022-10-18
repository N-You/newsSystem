import type { MenuProps } from 'antd/lib/menu'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import React from 'react'

export type MenuItem = Required<MenuProps>['items'][number]

export interface resMenu {
  id: number
  label: string
  key: string
  pagepermisson?: number
  grade?: number
  rightId?: number
  children?: resMenu[]
}

const iconList = {
  '/home': <UserOutlined />,
  '/user-manage': <VideoCameraOutlined />,
  '/user-manage/list': <VideoCameraOutlined />,
  '/right-manage': <UploadOutlined />,
  '/right-manage/role/list': <UploadOutlined />,
  '/right-manage/right/list': <UploadOutlined />,
  '/news-manage': <UploadOutlined />,
  '/news-manage/add': <UploadOutlined />,
  '/news-manage/draft': <UploadOutlined />,
  '/news-manage/category': <UploadOutlined />,
  '/audit-manage': <UploadOutlined />,
  '/audit-manage/audit': <UploadOutlined />,
  '/audit-manage/list': <UploadOutlined />,
  '/publish-manage': <UploadOutlined />,
  '/publish-manage/unpublished': <UploadOutlined />,
  '/publish-manage/published': <UploadOutlined />,
  '/publish-manage/sunset': <UploadOutlined />
}

export function getList(menulist: resMenu[]) {
  const res: MenuItem[] = []
  const data = menulist.filter((it: resMenu) => it.pagepermisson === 1)
  data.forEach((items: resMenu) => {
    const { label, key } = items
    if (items.children && items.children?.length > 0) {
      const newChild = getList(items.children)
      res.push({
        label,
        key,
        icon: iconList[key as keyof typeof iconList],
        children: newChild
      })
    } else {
      res.push({ label, key, icon: iconList[key as keyof typeof iconList] })
    }
  })
  return res
}
