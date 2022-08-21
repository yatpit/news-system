import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import Login from "../views/login/Login"
import NewsSandBox from "../views/sandbox/NewsSandBox"
// import Home from "../views/sandbox/home/Home"
// import UserList from "../views/sandbox/user-manage/UserList"
// import RoleList from "../views/sandbox/right-manage/RoleList"
// import RightList from "../views/sandbox/right-manage/RightList"
// import NoPermission from "../views/sandbox/nopermission/NoPermission"

export default function IndexRouter() {
  return (
    <HashRouter>
      {/* Switch表示只执行第一个匹配，只绘制子元素中第一个匹配的路由元素。 */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NewsSandBox />} />
        {/* 当匹配当路由时，判断本地有无token字段，没有则重定向到login */}
        {/* <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <NewsSandBox></NewsSandBox>
            ) : (
              <Navigate to="login" />
            )
          }
        /> */}
      </Routes>
    </HashRouter>
  )
}
