import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '@/pages/Login/Login'
import NewsSandBox from '@/pages/newsSandBox/newsSandBox'
import Redirect from '@/commponents/Redirect'
import NotFound from '@/pages/NotFound/NotFound'
import RightList from '@/commponents/right-manage/RightList'
import RoleList from '@/commponents/right-manage/RoleList'
import UserList from '@/commponents/user-manage/UserList'
import Home from '@/commponents/home/Home'
import Nopermisson from '@/pages/newsSandBox/nopermisson'
export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<NewsSandBox />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="user-manage/list" element={<UserList />}></Route>
          <Route path="right-manage">
            <Route index element={<Navigate to="role/list" />}></Route>
            <Route path="role/list" element={<RoleList />}></Route>
            <Route path="right/list" element={<RightList />}></Route>
          </Route>
          <Route path="*" element={<Nopermisson />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </HashRouter>
  )
}
