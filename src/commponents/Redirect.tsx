import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect(props: any) {
  const navigate = useNavigate()
  const { to } = props
  useEffect(() => {
    navigate(to, { replace: true })
  }, [])
  return null
}
