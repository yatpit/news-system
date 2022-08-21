import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import SideMenu from "../../components/sandbox/SideMenu"
import TopHeader from "../../components/sandbox/TopHeader"
import Home from "./home/Home"
import UserList from "./user-manage/UserList"
import RoleList from "./right-manage/RoleList"
import RightList from "./right-manage/RightList"
import NoPermission from "./nopermission/NoPermission"
import "./NewsSandBox.css"
import { Layout } from "antd"

const { Content } = Layout

function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* 定义二级路由 */}
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user-manage/list" element={<UserList />} />
            <Route path="right-manage/role/list" element={<RoleList />} />
            <Route path="right-manage/right/list" element={<RightList />} />
            <Route path="/" element={<Navigate replace from="/" to="home" />} />
            <Route path="*" element={<NoPermission />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default NewsSandBox
