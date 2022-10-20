import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd'

const { Option } = Select

interface propsItem {
  regionList: any[]
  roleList: any[]
  isUpdateDisable?: boolean
}

/* eslint-disable react/display-name */
const UserForm = forwardRef((props: propsItem, ref: any) => {
  const [isDisabled, setisDisabled] = useState(false)

  useEffect(() => {
    setisDisabled(!!props.isUpdateDisable && props.isUpdateDisable)
  }, [props.isUpdateDisable])
  return (
    <Form layout="vertical" ref={ref}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: 'Please input the title of collection!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: 'Please input the title of collection!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={[
          {
            required: !isDisabled,
            message: 'Please input the title of collection!'
          }
        ]}
      >
        <Select disabled={isDisabled}>
          {props.regionList.map((item: any) => (
            <Option value={item.value} key={item.id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: 'Please input the title of collection!'
          }
        ]}
      >
        <Select
          onChange={(value) => {
            if (value === 1) {
              setisDisabled(true)
              ref.current.setFieldsValue({
                region: ''
              })
            } else {
              setisDisabled(false)
            }
          }}
        >
          {props.roleList.map((item: any) => (
            <Option value={item.id} key={item.id}>
              {item.roleName}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})

export default UserForm
