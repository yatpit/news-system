import React, { Fragment, useEffect, useState } from "react"
import { Table, Tag } from "antd"
import axios from "axios"
import "./index.css"

function RightList() {
  const [right, setRight] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights").then((res) => {
      // console.log(res.data)
      setRight(res.data)
    })
  })

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
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
      dataIndex: "label",
      render: () => {
        return
      },
    },
  ]
  return (
    <Fragment>
      <Table columns={columns} dataSource={right} />
    </Fragment>
  )
}

export default RightList
