import Home from '@/pages/home/Home'
import Login from '@/pages/Login/Login'
import NewsSandBox from '@/pages/newsSandBox/newsSandBox'
import Nopermisson from '@/pages/newsSandBox/nopermisson'
import NotFound from '@/pages/NotFound/NotFound'
import RightList from '@/pages/right-manage/RightList'
import RoleList from '@/pages/right-manage/RoleList'
import UserList from '@/pages/user-manage/UserList'
import Redirect from '@/plugins/Redirect'
import React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<NewsSandBox />}>
          <Route index element={<Redirect to="home" />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="user-manage/list" element={<UserList />}></Route>
          <Route path="right-manage">
            <Route
              index
              element={<Navigate to="role/list" replace={true} />}
            ></Route>
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
