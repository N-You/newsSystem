import UserForm from '@/commponents/user-manage/UserForm'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import { Button, Modal, Switch, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'

const { confirm } = Modal

export default function UserList() {
  const [dataSource, setdataSource] = useState<any>([])
  const [regionList, setregionList] = useState([])
  const [roleList, setroleList] = useState([])
  const [current, setcurrent] = useState<any>(null)

  const [isAddVisible, setisAddVisible] = useState<boolean>(false)
  const [isUpdateVisible, setisUpdateVisible] = useState<boolean>(false)
  const [isUpdateDisable, setisUpdateDisable] = useState<boolean>(false)

  const addForm = useRef<any>()
  const updateForm = useRef<any>()

  const { roleId, region, username } = JSON.parse(
    localStorage.getItem('token')!
  )

  useEffect(() => {
    const roleObj = {
      '1': 'superadmin',
      '2': 'admin',
      '3': 'editor'
    }
    ;(async () => {
      try {
        const res = await axios.get('/api/users?_expand=role')
        const list = res.data
        setdataSource(
          roleObj[roleId as keyof typeof roleObj] === 'superadmin'
            ? list
            : [
                ...list.filter((item: any) => item.username === username),
                ...list.filter(
                  (item: any) =>
                    item.region === region &&
                    roleObj[item.roleId as keyof typeof roleObj] === 'editor'
                )
              ]
        )
      } catch (e) {
        console.log(e)
      }
    })()
  }, [roleId, region, username])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/regions')
        const list = res.data
        setregionList(list)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get('/api/roles')
        const list = res.data
        setroleList(list)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        {
          text: '全球',
          value: '全球'
        },
        ...regionList.map((item: any) => ({
          text: item.title,
          value: item.value
        }))
      ],
      onFilter: (value: any, item: any) => {
        if (value === '全球') {
          return item.region === ''
        }
        return item.region === value
      },
      render: (region: string) => {
        return <b>{region == '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role: any) => {
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState: boolean | undefined, item: any) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => {
              handleChange(item)
            }}
          ></Switch>
        )
      }
    },
    {
      title: '操作',
      render: (item: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => {
                handleUpdate(item)
              }}
            ></Button>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
              disabled={item.default}
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
      axios.delete(`/api/users/${item.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  const addFormOK = async () => {
    try {
      const data = await addForm.current.validateFields()
      const res = await axios.post(`/api/users`, {
        ...data,
        roleState: true,
        default: false
      })
      setdataSource([
        ...dataSource,
        {
          ...res.data,
          role: roleList.filter((item: any) => item.id === data.roleId)[0]
        }
      ])
      addForm.current.resetFields()
      setisAddVisible(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (item: any) => {
    item.roleState = !item.roleState
    setdataSource([...dataSource])
    try {
      axios.patch(`/api/users/${item.id}`, {
        roleState: item.roleState
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleUpdate = async (item: any) => {
    await setisUpdateVisible(true)
    setisUpdateDisable(item.roleId === 1)
    updateForm.current.setFieldsValue(item)
    setcurrent(item)
  }

  const updateFormOK = async () => {
    try {
      const data = await updateForm.current.validateFields()
      setdataSource(
        dataSource.map((item: any) => {
          if (item.id === current.id) {
            return {
              ...item,
              ...data,
              role: roleList.filter((item: any) => item.id === data.roleId)[0]
            }
          }
        })
      )
      const res = await axios.patch(`/api/users/${current.id}`, data)
      updateForm.current.resetFields()
      setisUpdateVisible(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setisAddVisible(true)
        }}
      >
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5
        }}
        rowKey={(item) => item.id}
      />

      {/* 添加用户 */}
      <Modal
        open={isAddVisible}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          addForm.current.resetFields()
          setisAddVisible(false)
        }}
        onOk={() => addFormOK()}
      >
        <UserForm
          ref={addForm}
          regionList={regionList}
          roleList={roleList}
        ></UserForm>
      </Modal>
      {/* 编辑用户 */}
      <Modal
        open={isUpdateVisible}
        title="更新用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setisUpdateVisible(false)
          setisUpdateDisable(!isUpdateDisable)
        }}
        onOk={() => updateFormOK()}
      >
        <UserForm
          ref={updateForm}
          regionList={regionList}
          roleList={roleList}
          isUpdateDisable={isUpdateDisable}
        ></UserForm>
      </Modal>
    </div>
  )
}
