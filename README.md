### JSON-Server

基于 node 封装的框架
默认解决跨域问题，设置了 Access-Control-Allow-Origin

- 全局安装npm i -g  json-server

- 测试json-server：在任务管理器中执行：json-server --watch .\test.json --port 8000，这个表示给当前目录下的test.json文件开启8000端口号，在json文件中，一级的key会自动当成接口来使用。

- json-server为了方便大家取数据，在启动创建server时已经解决了跨域的问题

- json-server的增、删、改、查，联合取

  查 ：get

  ```js
  axios.get('http://localhost:8000/posts/2').then(res=>{
      console.log(res)
  })
  ```

  增 ：post

  ```js
  axios.post('http://localhost:8000/posts').then(res=>{
      //id不用写，会自增长
      title:'2222'
      author:'zj'
  })
  ```

  删：delete，但是这里有个问题，如果新闻被删除了，那么新闻所关联的一些评论也会被删除。

  ```js
  axios.delete('http://localhost:8000/posts/1')
  ```

  改：有put和patch两个字段，put的意思是全部替换，而patch则是只修改你提交的那部分

  ```js
  axios.patch('http://localhost:8000/posts/1').then(res=>{
        //只会修改id为1的title,其他的信息不变
        title:'2222-22222'
  
  })
  ```

  _embed表连接，将所有的数据以及它们的关联数据都取出来

  ```js
  axios.get('http://localhost:8000/posts?_embed=comments').then(res=>{
      console.log(res)
  })
  ```

  _expand向上查找，注意这里的comments,post和接口posts的写法

  ```js
  axios.get('http://localhost:8000/comments?_expand=post).then(res=>{
      console.log(res)
  })
  ```

  

### 解构某个对象给另一个对象赋值

方法一 ：Object.assign()可以把一个对象的属性复制到另外一个对象里面

第一个参数是接受者，也就是要复制到的那个目标，第二个是复制的源;

```js
Object.assign(
  breakfast,
  {
    drink:'beer'
  }
)
console.log(breakfast)  //{drink:'beer'}
```


方法二：可以使用JSON.stringify过滤

```js
 // 原始
let person = {
  id:'',
  name: '',
  height: '',
  weight: '',
  happy: '',
  job: '',
  ...
};
let simplePerson = JSON.parse(JSON.stringify(person, ['name', 'age', 'job']))
// 很多人会忽视stringify第二个参数
```



### react-router高阶组件

useNavigate



### react-hook

useState

useEffect



### 受控组件与非受控组件

**概念：**

受控组件就是受可变状态（mutable state）控制，比如表单元素（如`<input>`、 `<textarea>` 和 `<select>`）的数据依托于React的state，通常保存在组件的 state 属性中，并且只能通过使用`setState()`来更新

非受控组件即不受状态的控制，获取数据通常是通过操作DOM，一般没有value，可以通过defaultValue来给初始值。可以 使用 ref 来从 DOM 节点中获取表单数据。

场景一：

输入 http://localhost:3000/ 后会重定向到 http://localhost:3000/#/home ，重定向后Sider的Menu会更新一次，加了`defaultSelectedKeys`和`defaultOpenKeys`的Menu是非受控组件，只在初次展示时有用





### Refs

Refs提供了一种方式，可以访问DOM 节点或在 render 方法中创建的 React 元素

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

理解：不需要使用state中的数据来完成渲染时

#### 访问 Refs

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。

#### 为 DOM 元素添加 ref

React 会在组件挂载时将DOM 元素赋给 `current` 属性，并在组件卸载时传入 `null` 值。`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

此时，ref指向DOM节点

#### 为 class 组件添加 Ref

此时，`ref`指向组件实例

#### Refs 与函数组件

默认情况下，不能在函数组件上使用 `ref` 属性，因为没有实例：

如果要在函数组件中使用 `ref`，你可以使用`forwardRef`（可与`useImperativeHandle`结合使用），或者可以将该组件转化为 class 组件。

#### 将 DOM Refs 暴露给父组件

官方不建议这么做

一般是 父组件拿子组件的ref，子组件获取Dom
