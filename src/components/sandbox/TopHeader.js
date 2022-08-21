import React, { useState } from "react"
import { Layout, Dropdown, Menu, Avatar } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons"
const { Header } = Layout

function TopHeader() {
  const [collapsed] = useState(false)
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "超级管理员",
        },
        {
          key: "2",
          danger: true,
          label: "退出",
        },
      ]}
    />
  )
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: "0 16px",
      }}
    >
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })} */}

      {/* 控制折叠,collapsed为true则隐藏 */}
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      <div style={{ float: "right" }}>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

export default TopHeader
