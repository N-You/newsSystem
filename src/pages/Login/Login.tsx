import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Particles from 'react-tsparticles'
import './Login.sass'

export default function Login() {
  const navigate = useNavigate()
  const options = {
    background: {
      color: '#0d47a1'
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: '#ffffff'
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 6,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: 'circle'
      },
      size: {
        random: true,
        value: 5
      }
    }
  } as any

  const onFinish = async (values: any) => {
    try {
      const res = await axios.get(
        `/api/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
      )
      if (res.data.length === 0) {
        message.error('用户名或密码不匹配')
      } else {
        localStorage.setItem('token', JSON.stringify(res.data[0]))
        navigate('/', { replace: true })
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div style={{ background: 'rgb(35,39,65)', height: '100%' }}>
      <Particles options={options} />
      <div className="formContainer">
        <div className="logintitle">全球新闻发布系统</div>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
