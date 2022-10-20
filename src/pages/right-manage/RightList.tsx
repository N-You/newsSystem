import type { resMenu } from '@/utils/getMenu'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Button, Modal, Popover, Switch, Table, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const { confirm } = Modal

export default function RightList() {
  const [dataSource, setdataSource] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/rights?_embed=children')
        const list = res.data
        list.forEach((item: resMenu) => {
          if (item.children && item.children?.length === 0) {
            item.children = undefined
          }
        })
        setdataSource(list)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: number) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'label'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key: string) => {
        return <Tag color="orange">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item: resMenu) => {
        return (
          <div style={{ display: 'flex' }}>
            <Popover
              content={
                <div style={{ textAlign: 'center' }}>
                  <Switch
                    checked={item.pagepermisson == 1}
                    onChange={() => switchMethod(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? '' : 'click'}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              ></Button>
            </Popover>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            ></Button>
          </div>
        )
      }
    }
  ]

  const confirmMethod = (item: resMenu) => {
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const deleteMethod = (item: resMenu) => {
    if (item.grade === 1) {
      setdataSource(dataSource.filter((data: any) => data.id !== item.id))
      try {
        axios.delete(`/api/rights/${item.id}`)
      } catch (e) {
        console.log(e)
      }
    } else {
      const list: resMenu[] = dataSource.filter(
        (data: any) => data.id === item.rightId
      )
      list[0].children =
        list[0].children &&
        list[0].children.filter((data: any) => data.id !== item.id)
      setdataSource([...dataSource])
      try {
        axios.delete(`/api/children/${item.id}`)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const switchMethod = (item: resMenu) => {
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setdataSource([...dataSource])
    if (item.grade === 1) {
      try {
        axios.patch(`/api/rights/${item.id}`, {
          pagepermisson: item.pagepermisson
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        axios.patch(`/api/children/${item.id}`, {
          pagepermisson: item.pagepermisson
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5
      }}
    />
  )
}
