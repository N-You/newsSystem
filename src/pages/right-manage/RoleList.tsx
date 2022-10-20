import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MenuOutlined
} from '@ant-design/icons'
import { Button, Table, Modal, Tree, TreeProps } from 'antd'
import Item from 'antd/lib/list/Item'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const { confirm } = Modal

export default function RoleList() {
  const [dataSource, setdataSource] = useState<any>([])
  const [currentRights, setcurrentRights] = useState<any>([])
  const [currentId, setcurrentId] = useState<any>([])
  const [rightList, setrightList] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/roles')
        setdataSource(res.data)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/rights?_embed=children')
        setrightList(res.data)
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
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      render: (item: any) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<MenuOutlined />}
              onClick={() => {
                showModal(item)
                setcurrentRights(item.rights)
                setcurrentId(item.id)
              }}
            ></Button>
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

  const confirmMethod = (item: any) => {
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

  const deleteMethod = (item: any) => {
    setdataSource(dataSource.filter((data: any) => data.id !== item.id))
    try {
      axios.delete(`/api/roles/${item.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const showModal = (item: any) => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    setdataSource(
      dataSource.map((item: any) => {
        if (item.id === currentId) {
          return {
            ...item,
            rights: currentRights
          }
        }
        return item
      })
    )

    try {
      axios.patch(`/api/roles/${currentId}`, {
        rights: currentRights
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCheck: TreeProps['onCheck'] = (checkedKeys: any, info) => {
    setcurrentRights(checkedKeys?.checked)
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item: any) => item.id}
      ></Table>

      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          treeData={rightList}
          checkedKeys={currentRights}
          onCheck={onCheck}
          checkStrictly={true}
          fieldNames={{ title: 'label' }}
        />
      </Modal>
    </div>
  )
}
