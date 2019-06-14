import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Layout, Menu, Icon, Avatar, message, Button } from "antd";

const { Sider, Content, Header } = Layout;

// 导入应用全局样式
// import "../assets/style/app.css";
import "@yuanshutech/app-commons/styles/app.css";

// 导入应用路由数据
import routers from "../routers";
// 获取菜单
const leftMenus = routers.leftMenu.menuItems ? routers.leftMenu.menuItems : [];

export default class MainLayout extends Component {
	state = {
		routers: [],
		selectedKeys: []
	};

	// 从子页面跳转路由时动态更新菜单选择
	changeMenuSelected = path => {
		this.setState({ selectedKeys: [`2-${path}`] });
	};

	// 组件加载前获取路由数据
	async componentWillMount() {
		this.setState({ routers: this.getAllPathAndComponent(leftMenus) }, () => {
			let currentPath = "";
			if (this.props.location.pathname === "/") {
				currentPath = this.state.routers[0].path;
			} else {
				let arr = this.props.location.pathname.split("/");
				currentPath = "/" + arr[1];
			}
			this.changeMenuSelected(currentPath);
		});
	}

	render() {
		return (
			<Layout>
				<Sider className="left-sider" style={{ background: "#7dbcea" }}>
					<div className="left-sider-app-title">
						<div className="app-name">
							{<Avatar shape="square" size={32} icon="radar-chart" />}
							<h1 className="app-name-h1">{routers.leftMenu.title}</h1>
						</div>
					</div>
					<Menu
						style={{ clear: "both" }}
						mode="inline"
						selectedKeys={this.state.selectedKeys}
						onSelect={({ item, key, selectedKeys }) => {
							this.setState({
								selectedKeys: selectedKeys
							});
						}}
					>
						{leftMenus.map((menu, index) => {
							// 判断一级菜单下是否有子菜单
							if (menu.subMenus && menu.subMenus.length) {
								return (
									<Menu.ItemGroup key={`1-${menu.title}`} title={menu.title}>
										{menu.subMenus.map((submenu, index) => {
											return (
												<Menu.Item key={`2-${submenu.path}`}>
													<Link to={`${submenu.path}`} replace>
														{/* <Icon type={menu.icon ? menu.icon : "bars"} /> */}
														<span>{submenu.title}</span>
													</Link>
												</Menu.Item>
											);
										})}
									</Menu.ItemGroup>
								);
							} else {
								return (
									<Menu.Item key={`2-${menu.path}`}>
										<Link to={`${menu.path}`} replace>
											{/* <Icon type={menu.icon ? menu.icon : "bars"} /> */}
											<span>{menu.title}</span>
										</Link>
									</Menu.Item>
								);
							}
						})}
					</Menu>
				</Sider>
				<Content className="workspace">
					<Switch>
						{/*左侧边栏的路由*/}
						{this.state.routers.map((item, index) => {
							if (item.page) {
								let RouterPage = require(`../pages/${item.page}`).default;
								return <Route key={index} path={item.path} render={() => <RouterPage {...this.props} pageInfo={item} changeMenuSelected={this.changeMenuSelected} />} />;
							}
						})}
						{/* 默认展示路由 */}
						<Route path="/" render={() => <Redirect to={this.state.routers[0].path} />} />
					</Switch>
				</Content>
			</Layout>
		);
	}

	// 获取所有path及page
	getAllPathAndComponent = routers => {
		let pathAndComponent = [];

		routers.forEach(item => {
			// 获取一级path、page及title
			if (item.path) {
				pathAndComponent.push(item);
			}

			if (item.subMenus) {
				item.subMenus.forEach(subitem => {
					if (subitem.path) {
						pathAndComponent.push(subitem);
					}
				});
			}
		});

		return pathAndComponent;
	};
}
