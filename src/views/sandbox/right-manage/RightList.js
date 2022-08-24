import React, { Fragment, useEffect, useState } from "react"
import { Button, Table, Tag, Modal, Popover, Switch } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import axios from "axios"
import "./index.css"

const { confirm } = Modal

function RightList() {
  const [right, setRight] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      // console.log(res.data)
      const rigthData = res.data.map((item) => {
        // 如果children为空，则删除children这个属性
        if (item.children.length === 0) {
          delete item.children
        }
        return item
      })
      setRight(rigthData)
    })
  }, [])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b >
      }
    },
    {
      title: "权限名称",
      dataIndex: "label",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="geekblue">{key}</Tag>
      },
    },
    {
      title: "操作",
      // dataIndex: "label",
      // 定义了dataIndex的话item是key值，没定义的话item是整个对象
      render: (item) => {
        return (
          <div className="operateBtn">
            <Popover
              content={
                <div style={{ textAlign: "center" }}>
                  <Switch
                    checked={item.pagepermisson}
                    onChange={() => handleSwitch(item)}
                  ></Switch>
                </div>
              }
              title="页面配置项"
              trigger={item.pagepermisson === undefined ? "" : "click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson === undefined}
              />
            </Popover>

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
    // 如果删除的时二级菜单，先找到其对应的一级菜单，再删除对应的children节点
    if (item.grade === 2) {
      let list = right.filter((data) => data.id === item.rightId)
      list[0].children = list[0].children.filter((data) => data.id !== item.id)
      // filter不是深拷贝，只能保证第一层不发生改变，这个时候right中的children已经
      // 发生改变，直接复制一份right，即可更新
      setRight([...right])
      // axios.delete(`http://localhost:5000/children/${item.id}`)
    } else {
      setRight(right.filter((data) => data.id !== item.id))
      // axios.delete(`http://localhost:5000/rights/${item.id}`)
    }
  }

  const handleSwitch = (item) => {
    console.log(item)
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    // 此时right中的pagepermisson值已经改变，属于歪门邪道
    setRight([...right])
    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson,
      })
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson,
      })
    }
  }

  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={right}
      // pagination={{ pageSize: 5 }}
      />
    </Fragment>
  )
}

export default RightList
