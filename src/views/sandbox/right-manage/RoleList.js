import React, { Fragment, useEffect, useState } from "react"
import { Table, Button, Modal, Tree } from 'antd'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import axios from "axios"
import './index.css'

const { confirm } = Modal

function RoleList() {
  const [role, setRole] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [right, setRight] = useState([])
  const [currentId, setCurrentId] = useState([])
  const [currentRight, setCurrentRight] = useState([])
  const [refresh, setRefresh] = useState([false])

  useEffect(() => {
    axios.get('http://localhost:5000/roles').then((res) => {
      // console.log(res.data)
      setRole(res.data)
    })
    axios.get('http://localhost:5000/rights?_embed=children').then((res) => {
      // console.log(res.data)
      // 把属性名label改成title
      const treeData = JSON.parse(JSON.stringify(res.data).replace(/label/g, "title"))
      // console.log(treeData)
      setRight(treeData)
    })
  }, [refresh])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b >
      }
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "操作",
      // dataIndex: "label",
      // 定义了dataIndex的话item是key值，没定义的话item是整个对象
      render: (item) => {
        return (
          <div className="operateBtn">

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setIsModalVisible(true)
                setCurrentRight(item.rights)
                setCurrentId(item.id)
                // console.log(item.rights)
              }}
            // disabled={item.pagepermisson === undefined}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDel(item)}
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

    setRole(role.filter((data) => data.id !== item.id))
    // axios.delete(`http://localhost:5000/rights/${item.id}`)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    // 将更改的选项框同步到role中
    setRole(role.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          right: currentRight
        }
      }
      return item  // 赋值给了role
    }))
    // 更新服务器数据
    // 如果写了setRefresh，会重新获取服务器数据，就不需要上面的手动setRole了
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRight
      // })
    }).then(setRefresh)
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const handleCheck = (checkedKeys) => {
    setCurrentRight(checkedKeys.checked)

    // console.log(checkedKeys.checked)
  };

  return (
    <Fragment>
      <Table
        dataSource={role}
        columns={columns}
        rowKey={(item) => item.id}
      />
      <Modal
        title={'Basic Modal'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          checkStrictly
          treeData={right}
          checkedKeys={currentRight}
          onCheck={handleCheck}
        />
      </Modal>
    </Fragment>
  )
}

export default RoleList
