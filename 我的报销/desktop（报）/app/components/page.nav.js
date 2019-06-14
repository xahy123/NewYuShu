import React, { Component } from "react";
import { PageHeader, Icon, Drawer, Tabs, Badge, message, Empty, List, Avatar, Tooltip } from "antd";
import ReactMarkdown from "react-markdown";

const listData = [];
for (let i = 0; i < 23; i++) {
	listData.push({
		title: `消息发送者的姓名`,
		avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
		description: "消息摘要信息 消息摘要信息 消息摘要信息 消息摘要信息 ",
		content: "消息正文内容，消息正文内容，消息正文内容，消息正文内容，消息正文内容，消息正文内容，消息正文内容，"
	});
}

const IconText = ({ type, text }) => (
	<span>
		<Icon type={type} style={{ marginRight: 8 }} />
		{text}
	</span>
);

export default class PageNavHeader extends Component {
	state = {
		// 未处理消息
		unProcessMsgs: ["0"],
		// 常用应用列表：按使用频率显示前10个

		// 组织授权的全部应用清单，按应用分类显示

		// 控制显示帮助抽屉页
		helpDrawerVisible: false,
		// 控制显示待处理消息抽屉页
		msgDrawerVisible: false,
		// 控制显示应用切换抽屉页
		appsDrawerVisible: false,
		// 操作说明默认信息
		helpContentForMD: "# 暂无操作说明",
		// 业务说明默认信息
		bizzContentForMD: "# 暂无业务说明"
	};

	navs = [
		<Tooltip placement="bottom" title="显示待处理消息" key="0">
			<Badge dot={this.state.unProcessMsgs.length > 0}>
				<Icon
					type="schedule"
					theme="twoTone"
					style={{ fontSize: "16px" }}
					twoToneColor="#52c41a"
					onClick={() => {
						this.state.unProcessMsgs.length > 0 ? this.showMsgDrawer() : message.warning("没有要处理的消息！");
					}}
				/>
			</Badge>
		</Tooltip>,

		<Tooltip placement="bottom" title="切换应用" key="1">
			<Icon
				type="appstore"
				theme="twoTone"
				twoToneColor="#6495ED"
				style={{ marginLeft: 20, fontSize: "16px" }}
				onClick={() => {
					this.showAppsDrawer();
				}}
			/>
		</Tooltip>,

		<Tooltip placement="bottom" title="显示帮助信息" key="2">
			<Icon
				type="question-circle"
				theme="twoTone"
				style={{ marginLeft: 20, fontSize: "16px" }}
				onClick={() => {
					this.showHelpDrawer();
					try {
						let help = require("../mds/help/" + this.props.pageInfo.page + ".md");
						fetch(help)
							.then(res => res.text())
							.then(text => this.setState({ helpContentForMD: text }));
					} catch (error) {}

					try {
						let bizz = require("../mds/bizz/" + this.props.pageInfo.page + ".md");

						fetch(bizz)
							.then(res => res.text())
							.then(text => this.setState({ bizzContentForMD: text }));
					} catch (error) {}
				}}
			/>
		</Tooltip>,

		<Tooltip placement="bottomRight" title="重新加载数据" key="3">
			<Icon
				type="reload"
				style={{ marginLeft: 20, fontSize: "14px" }}
				onClick={() => {
					if (this.props.reloadData) {
						this.props.reloadData();
					}
					// this.props.history.replace(this.props.pageInfo.path);
				}}
			/>
		</Tooltip>
	];

	render() {
		return (
			<div>
				<PageHeader
					onBack={() => {
						this.props.backPage && this.props.history.replace(this.props.backPage);
					}}
					title={this.props.pageInfo.title}
					subTitle={this.props.pageInfo.subTitle ? this.props.pageInfo.subTitle : ""}
					extra={this.navs}
				/>
				<Drawer width={720} onClose={this.onCloseHelpDrawer} visible={this.state.helpDrawerVisible}>
					<Tabs defaultActiveKey="1" onChange={() => {}}>
						<Tabs.TabPane tab="业务说明" key="1">
							<ReactMarkdown source={this.state.bizzContentForMD} />
						</Tabs.TabPane>
						<Tabs.TabPane tab="操作说明" key="2">
							<ReactMarkdown source={this.state.helpContentForMD} />
						</Tabs.TabPane>
					</Tabs>
				</Drawer>
				<Drawer title="待处理消息" width={600} onClose={this.onCloseMsgDrawer} visible={this.state.msgDrawerVisible}>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={listData}
						renderItem={item => (
							<List.Item key={item.title} actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}>
								<List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description} />
								{item.content}
							</List.Item>
						)}
					/>
					<Empty />
				</Drawer>
				<Drawer title="应用列表" placement="right" width={600} onClose={this.onCloseAppsDrawer} visible={this.state.appsDrawerVisible}>
					<div style={{ marginBottom: 20, lineHeight: "30px", paddingLeft: 10, borderBottom: "1px solid #f56a00", borderLeft: "6px solid #f56a00" }}>常用应用</div>
					<List
						style={{ marginBottom: 30 }}
						grid={{
							gutter: 16,
							column: 5
						}}
						dataSource={data}
						renderItem={item => (
							<List.Item style={{ textAlign: "center" }} title={item.title}>
								<Avatar shape="square" size={48} icon="appstore" />
								<div style={{ height: 30 }}>{item.title}</div>
							</List.Item>
						)}
					/>
					<div style={{ marginBottom: 20, lineHeight: "30px", paddingLeft: 10, borderBottom: "1px solid #ffbf00", borderLeft: "6px solid #ffbf00" }}>应用分类</div>
					<List
						style={{ marginBottom: 30 }}
						grid={{
							gutter: 16,
							column: 5
						}}
						dataSource={data}
						renderItem={item => (
							<List.Item style={{ textAlign: "center" }} title={item.title}>
								<Avatar shape="square" size={48} icon="appstore" />
								<div style={{ height: 30 }}>{item.title}</div>
							</List.Item>
						)}
					/>
					<div style={{ marginBottom: 20, lineHeight: "30px", paddingLeft: 10, borderBottom: "1px solid #00a2ae", borderLeft: "6px solid #00a2ae" }}>应用分类</div>
					<List
						style={{ marginBottom: 30 }}
						grid={{
							gutter: 16,
							column: 5
						}}
						dataSource={data}
						renderItem={item => (
							<List.Item style={{ textAlign: "center" }} title={item.title}>
								<Avatar shape="square" size={48} icon="appstore" />
								<div style={{ height: 30 }}>{item.title}</div>
							</List.Item>
						)}
					/>
					<Empty />
				</Drawer>
			</div>
		);
	}

	showMsgDrawer = () => {
		this.setState({
			msgDrawerVisible: true
		});
	};

	onCloseMsgDrawer = () => {
		this.setState({
			msgDrawerVisible: false
		});
	};

	showAppsDrawer = () => {
		this.setState({
			appsDrawerVisible: true
		});
	};

	onCloseAppsDrawer = () => {
		this.setState({
			appsDrawerVisible: false
		});
	};

	showHelpDrawer = () => {
		this.setState({
			helpDrawerVisible: true
		});
	};

	onCloseHelpDrawer = () => {
		this.setState({
			helpDrawerVisible: false
		});
	};
}

const data = [
	{
		title: "应用名称"
	},
	{
		title: "应用名称"
	},
	{
		title: "应用名称应用名称应用"
	},
	{
		title: "应用名称"
	},
	{
		title: "应用名称"
	},
	{
		title: "应用名称"
	},
	{
		title: "应用名称应用名称应用"
	},
	{
		title: "应用名称"
	},
	{
		title: "应用名称"
	}
];
