import React, { useEffect, useState } from "react"
import { Layout, Menu } from "antd"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router"
import "./index.css"
import axios from "axios"

const { Sider } = Layout

// 推荐把key设置为路由，唯一标识
// function getItem(label, key, icon, children) {
//   return {
//     label,
//     key,
//     icon,
//     children,
//     // type,
//   }
// }

// const menuItems = [
//   getItem("首页", "/home", <UserOutlined />, null),
//   getItem("用户管理", "user-manage", <UserOutlined />, [
//     getItem("用户列表", "user-manage/list", null),
//   ]),
//   getItem("权限管理", "right-manage", <UserOutlined />, [
//     getItem("角色列表", "right-manage/role/list", null),
//     getItem("权限列表", "right-manage/right/list", null),
//   ]),
// ]

function SideMenu() {
  // 高阶组件
  let navigate = useNavigate()

  // 获取当前选中的菜单项
  let location = useLocation()
  const selectKeys = [location.pathname]
  const openKeys = ["/" + location.pathname.split("/")[1]]
  // console.log(selectKeys, openKeys)

  const [menu, setMenu] = useState([])

  // 过滤权限数组中带有pagepermisson属性的对象，包括children中的嵌套对象
  const checkPagePermission = (resData) => {
    const item = resData.map((item) => {
      // 如果children为空，则删除children这个属性
      if (item.children.length === 0) {
        delete item.children
        return item
      }
      // 过滤掉children数组中不带属性的对象
      const newChildren = item.children.filter((child) => {
        return child.pagepermisson === 1
      })
      return { ...item, children: newChildren }
    })
    return JSON.parse(JSON.stringify(item, ["label", "key", "children"]))
    // 只取label,key,children属性
  }

  // 为每个一级菜单添加icon
  const addIcon = (menuData) => {
    const iconList = {
      "/home": <UserOutlined />,
      "/user-manage": <UploadOutlined />,
      "/right-manage": <VideoCameraOutlined />,
      "/news-manage": <UserOutlined />,
      "/audit-manage": <UploadOutlined />,
      "/publish-manage": <VideoCameraOutlined />,
    }
    return menuData.map((item) => {
      if (iconList[item.key]) {
        item.icon = iconList[item.key]
      }
      return item
    })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      let menuData = addIcon(checkPagePermission(res.data))
      // console.log(menuData)
      setMenu(menuData)
    })
  }, [])

  return (
    <Sider trigger={null} collapsible>
      <div className="logo">新闻发布系统</div>
      <div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectKeys}
          defaultOpenKeys={openKeys}
          items={menu}
          onClick={(e) => navigate(e.key)}
        >
          {/* {renderMenu(menuItems)} */}
        </Menu>
      </div>
    </Sider>
  )
}

export default SideMenu
