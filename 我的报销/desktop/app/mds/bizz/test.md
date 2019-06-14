# test 业务说明
# react-project
react-project
搭建 webpack+React+antd+redux+router

博客地址

# react-router 还是 react-router-dom？

> 在 React 的使用中，我们一般要引入两个包，react 和 react-dom，那么 react-router 和  react-router-dom 是不是两个都要引用呢？
> 非也，坑就在这里。他们两个只要引用一个就行了，不同之处就是后者比前者多出了 <Link> <BrowserRouter> 这样的 DOM 类组件。
> 因此我们只需引用 react-router-dom 这个包就行了。当然，如果搭配 redux ，你还需要使用 react-router-redux。


# react的this的绑定  

可以对class的属性进行转译。
```
  goBack = () => {
    this.props.history.push('list/3')
  }
  render() {
    return (
      <div>
        <Link to="/home">返回首页</Link>
        <Button onClick={this.goBack} type="primary">返回首页</Button>
        <h1>404</h1>
      </div >
    )
  }
}
```
