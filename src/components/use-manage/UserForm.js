import React from "react"
import { Form, Input, Select } from "antd"
const { Option } = Select


function UserForm(props) {
  return (
    <Form
      // form={form}
      layout="vertical"
    // name="form_in_modal"
    // initialValues={{
    //   modifier: "public",
    // }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Select>
          {props.region.map((item) => {
            return (
              <Option value={item.value} key={item.id}>
                {item.title}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="role"
        label="角色"
        rules={[
          {
            required: true,
            message: "Please input the title of collection!",
          },
        ]}
      >
        <Select>
          {props.role.map((item) => {
            return (
              <Option value={item.roleName} key={item.id}>
                {item.roleName}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}


export default UserForm