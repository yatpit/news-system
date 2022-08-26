import React, { Fragment, useEffect, useState } from "react"
import { Button, Table, Modal, Switch, Form, Input, Select } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import axios from "axios"
import UserForm from "../../../components/use-manage/UserForm"
// import "./index.css"

const { confirm } = Modal
const { Option } = Select

function UserList() {
  const [user, setUser] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [role, setRole] = useState([])
  const [region, setRegion] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then((res) => {
      // console.log(res.data)
      setUser(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => {
      console.log(res.data)
      setRole(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then((res) => {
      console.log(res.data)
      setRegion(res.data)
    })
  }, [])

  const columns = [
    {
      title: "区域",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "全球" : region}</b >
      }
    },
    {
      title: "角色名称",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={item.default}
              onClick={() => setIsAddVisible(true)}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDel(item)}
              disabled={item.default}
              danger
            />
          </div>
        )
      },
    },
  ]

  const handleDel = (item) => {
    confirm({
      // icon: <ExclamationCircleOutlined />,
      content: "您确定删除吗？",
      onOk() {
        delMethod(item)
      },
      onCancel() {
        console.log("Cancel")
      },
    })
  }

  const delMethod = (item) => {
    // 当前页面同步状态+后端同步
    console.log(item)
  }


  return (
    <Fragment>
      <Button type="primary" >添加用户</Button>
      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="添加"
        cancelText="取消"
        onCancel={() => setIsAddVisible(false)}
      // onOk={() => {
      //   form
      //     .validateFields()
      //     .then((values) => {
      //       form.resetFields();
      //       onCreate(values);
      //     })
      //     .catch((info) => {
      //       console.log('Validate Failed:', info);
      //     });
      // }}
      >
        <UserForm region={region} role={role}></UserForm>
      </Modal>
      <Table
        columns={columns}
        dataSource={user}
        pagination={{ pageSize: 5 }}
        rowKey={item => item.id}
      />
    </Fragment>
  )
}

export default UserList

