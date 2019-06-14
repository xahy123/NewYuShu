import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";
import routers from "../routers";
import PageNav from "../components/page.nav";
import '../assets/style/my.reimbursement.css';
import InfiniteScroll from 'react-infinite-scroller';
import Slider from "react-slick";
import '../assets/style/slick.css';
import '../assets/style/slick-theme.css';
import '../assets/style/docs.css';


import { Affix, Drawer, Button, Modal, Tag, Tooltip, Timeline, BackTop, Spin, Table, Form, Row, Col, DatePicker, Select, List, notification, Collapse, Icon } from "antd";
const ButtonGroup = Button.Group;
const Option = Select.Option;
const Panel = Collapse.Panel;
const listData = [];


const styles = {
	slide: {
	  padding: 15,
	  minHeight: 100,
	  color: '#fff',
	},
	slide1: {
	  background: '#FEA900',
	},
	slide2: {
	  background: '#B3DC4A',
	},
	slide3: {
	  background: '#6AC0FF',
	},
};

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class SchemaPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerTitle: "模式信息",
			isShow: false,
			listData: [],
			loading: false,
			hasMore: true,
			num:0,
			visible:false,
			isPicturePreviewShow:false,
			previewImgUrl:undefined,
			draggable:false
		};
		// this.carouselRef = null;
		// this.setCarouselRef = el => {
		// 	this.carouselRef = el;
		// };
	}

	dataSource = [
		{
			key: '1',
			title: '外出',
			desc: '外出消费',
			price: 56.6,
			category: '交通',
			subordinate: null,
			time: "2018-12-23",
			status: "审批中"
		},{
			key: '2',
			title: '外出1',
			desc: '外出消费1',
			price: 66.6,
			category: '交通1',
			subordinate: null,
			time: "2018-09-23",
			status: "审批中"
		},{
			key: '3',
			title: '外出2',
			desc: '外出消费2',
			price: 156.6,
			category: '交通2',
			subordinate: null,
			time: "2018-11-23",
			status: "审批中"
		},
	];
	  
	columns = [
		{
			title: '报销名称',
			dataIndex: 'title',
			key: 'title',
			align: 'center',
		},
		{
			title: '报销说明',
			dataIndex: 'description',
			key: 'description',
			align: 'center',
			render: text => {
				if(text.length>10){
					return (
						<Tooltip title={text}>
							<span>{text.substring(0,10)}……</span>
						</Tooltip>
					)
				}else{
					return <span>{text}</span>
				}
			}
		},
		{
			title: '金额/元',
			dataIndex: 'price',
			key: 'price',
			align: 'center',
		},
		// {
		// 	title: '报销类别',
		// 	dataIndex: 'category',
		// 	key: 'category',
		// 	align: 'center',
		// },
		{
			title: '报销所属项目',
			dataIndex: 'subordinate',
			key: 'subordinate',
			align: 'center',
			render: text => text || "无"
		},
		{
			title: '报销申请创建时间',
			dataIndex: 'time',
			key: 'time',
			align: 'center',
		},
		{
			title: '状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			filters: [{ text:"全部", value:"全部" },{ text:"审批中", value:"审批中" },{ text:"审批通过", value:"审批通过" },{ text:"审批驳回", value:"审批驳回" },{ text:"审批撤销", value:"审批撤销" }]
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			align: 'center',
			render: () => {
				return (
					<span>
						<a>查看</a>
						<a style={{marginLeft:7}}>撤销</a>
					</span>
				)
			}
		},
	];

	componentDidMount() {
		if (this.carouselRef) this.carouselRef.next();
		let data = [];	
		let x = this.state.num;
		x++;	
		for (let i = 0; i < 3; i++) {
			data.push({
				href: 'http://ant.design',
				title: `外出 ${i}`,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				description:
				'报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明',
				time: `2019-12-9-1${i}`,
				price: `1${i}5.6`,
				status: "审批通过",
				content:
				'We supply practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
			});
		}
		this.setState({
			listData:this.state.listData.concat(data),
			num:x
		})
	}
	handleInfiniteOnLoad = () => {
		this.setState({
			loading: true,
		})
		setTimeout(() => {
			let data = [];
			let x = this.state.num;
			x++;
			for (let i = 0; i < 3; i++) {
				data.push({
					href: 'http://ant.design',
					title: `外出 ${i}`,
					avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
					description:
					'报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明报销说明',
					time: `2019-12-9-1${i}`,
					price: `1${i}5.6`,
					status: "已领取",
					content:
					'We supply practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
				});
			}
			this.setState({
				listData:this.state.listData.concat(data),
				num:x
			},() => {
				if(this.state.num >= 4){
					this.setState({
						hasMore: false,
						loading: false,
					})
				}else{
					this.setState({
						loading: false,
					})
				}
			})
		},1000)
		
	}

	handleTableChange = (pagination, filters, sorter) => {
		console.log(pagination);
		console.log(filters);
		console.log(sorter);
	}

	imgClick = () => {
		this.setState({
			isPicturePreviewShow:true,
			previewImgUrl:"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
			draggable:true
		})
	}

	
	colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

	render() {
		const settings = {
			// autoplay: true,
			dots: true,
			infinite: true,
			arrows: true,
			draggable: this.state.draggable,
			// accessibility: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			customPaging: i => <button style={{fontSize:30}}></button>,
			focusOnSelect: true
			// appendDots: dots => <ul>{dots}</ul>
		};
		// const setting = {
		// 	// autoplay: true,
		// 	dots: true,
		// 	infinite: true,
		// 	arrows: true,
		// 	draggable: true,
		// 	// accessibility: true,
		// 	speed: 500,
		// 	slidesToShow: 1,
		// 	slidesToScroll: 1,
		// 	customPaging: i => <button style={{fontSize:30}}></button>,
		// 	focusOnSelect: true
		// 	// appendDots: dots => <ul>{dots}</ul>
		// };
		return (
			<div>
				<Affix offsetTop={0}>
					<PageNav reloadData={this.reloadData} history={this.props.history} pageInfo={this.props.pageInfo} />
				</Affix>
				<div style={{height:41,margin: "20px 20px"}}>
					
					<a key="2" onClick={() => {
						this.setState({
							isShow:!this.state.isShow
						})
					}} style={{float:"right",paddingRight:20,marginTop:10}}>
						<Icon type="appstore" theme="twoTone" style={{ fontSize: 16, paddingRight: 7 }} />
						<span>更换展示</span>
					</a>
				</div>
				<div style={{display: this.state.isShow ? "block" : "none"}}>
					<Form layout="inline" style={{
						padding: 24,
						background: "#fbfbfb",
						border: "1px solid #d9d9d9",
						borderRadius: 6,
					}}>
						<Row gutter={24}>
							<Col span={24}>
								<Form.Item label="创建时间断">
									<DatePicker.RangePicker style={{minWidth:220}}/>
								</Form.Item>
								<Form.Item label="报销类别">
									<Select placeholder="请选择" style={{minWidth:220}}>
										<Option value="交通费">交通费</Option>
										<Option value="餐费">餐费</Option>
										<Option value="住宿费">住宿费</Option>
									</Select>
								</Form.Item>
								<Form.Item label="报销所属项目">
									<Select placeholder="请选择" style={{minWidth:220}}>
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={24} style={{ textAlign: 'right' }}>
								<Button type="primary">查询</Button>
								<Button style={{ marginLeft: 8 }}>重置</Button>
							</Col>
						</Row>
					</Form>
					<Table 
						dataSource={this.state.listData} 
						columns={this.columns} 
						onChange={this.handleTableChange}
						rowKey={record => record.time}
					/>
				</div>
				<div className="demo-infinite-container" id="markdownBody" style={{display: this.state.isShow ? "none" : "block"}}>
					<InfiniteScroll
						initialLoad={false} //组件是否应加载第一组项目。默认为true
						pageStart={0} //要加载的第一个页面的编号，默认情况下0，第一个页面是1。
						loadMore={this.handleInfiniteOnLoad} //用户请求更多项目时的回调。接收指定要加载的页面的单个参数
						hasMore={!this.state.loading && this.state.hasMore} //是否有更多项目要加载。如果删除事件侦听器false。
						useWindow={false} //向窗口添加滚动侦听器，否则添加组件的滚动侦听器parentNode。默认为true
					>
						<List
							itemLayout="vertical"
							dataSource={this.state.listData}
							style={{
								border: "1px solid #d9d9d9",
								borderRadius: 6,
							}}
							header={
								null
							}
							renderItem={item => (
								<List.Item
									style={{
										padding: "20px 20px",
									}}
									key={item.title}
									extra={
										<div style={{width:200,marginRight:15}}>
											<Slider {...settings}>
												<div>
													<h3><div onClick={this.imgClick} style={{
														height: "150px",
														backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
														backgroundSize:"100%"
													}}></div></h3>
												</div>
												<div>
													<h3><div onClick={this.imgClick} style={{
														height: "150px",
														backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
														backgroundSize:"100%"
													}}></div></h3>
												</div>
												<div>
													<h3><div onClick={this.imgClick} style={{
														height: "150px",
														backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
														backgroundSize:"100%"
													}}></div></h3>
												</div>
												<div>
													<h3><div onClick={this.imgClick} style={{
														height: "150px",
														backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
														backgroundSize:"100%"
													}}></div></h3>
												</div>
											</Slider>
										</div>
										
									}
									actions={[
										<Collapse
											bordered={false}
										>
											<Panel header="报销明细" key="1" style={{
												border: 0,
											}}>
												<p>报销类别：</p>
												<p>报销金额：</p>
												<p>报销说明：</p>
											</Panel>
										</Collapse>
									]}
								>
									<List.Item.Meta
										// avatar={<Avatar src={item.avatar} />}
										title={item.title}
										description={
											<span>{item.description}</span>
										}
									/>
									<Row>
										<Col>报销申请创建时间：<Tag color="#FF9933" style={{fontWeight:"bolder"}}>{item.time}</Tag></Col>
										<Col style={{marginTop:10}}>报销总额（元）：<span style={{fontWeight:"bolder"}}>{item.price}</span></Col>
										{/* <Col style={{marginTop:10}}>附件：<span style={{fontWeight:"bolder"}}></span></Col> */}
										<Col style={{marginTop:10}}>审批人：<Tag color="#33CCFF">程力</Tag></Col>
										<Col style={{marginTop:10}}>报销申请状态：
											<span style={{fontWeight:"bolder"}}>{item.status}</span>
											<Icon type="question-circle" theme="twoTone" style={{ fontSize: 16, paddingLeft: 7 }} onClick={
												() => {
													notification.open({
														message: '审批记录',
														style: {marginTop:200},
														description:<Fragment>
															<Timeline>
																<Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
																<Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
																<Timeline.Item color="red">
																	<p>Solve initial network problems 1</p>
																	<p>Solve initial network problems 2</p>
																	<p>Solve initial network problems 3 2015-09-01</p>
																</Timeline.Item>
																<Timeline.Item>
																	<p>Technical testing 1</p>
																	<p>Technical testing 2</p>
																	<p>Technical testing 3 2015-09-01</p>
																</Timeline.Item>
															</Timeline>
														</Fragment>
													})
												}
											} />
											<a style={{paddingLeft:7,fontWeight:"bolder"}}>撤销</a>
										</Col>
									</Row>
								</List.Item>
							)}
							
						>
							{
								this.state.loading && this.state.hasMore && (
									<div className="demo-loading-container">
										<Spin />
									</div>
							  	)
							}
							
							<div>
								<BackTop target={() => document.getElementById('markdownBody')} visibilityHeight={0}>
									<Button type="primary" style={{position:"absolute",right:0,bottom:0,marginBottom:50}}>UP</Button>
								</BackTop>
							</div>
						</List>
					</InfiniteScroll>
				</div>
				<Drawer
					title="新增报销申请"
					closable={false}
					width={650}
					onClose={() => {
						this.setState({
							visible: false
						})
						this.props.history.replace({ pathname: "/my.reimbursement" });
					}}
					visible={this.state.visible}
				>
					<Switch>
						{
							routers.myReimbursementPageDrawer && routers.myReimbursementPageDrawer.map((item, index) => {
								if (item.page) {
									let RouterPage = require(`./${item.page}`).default;
									return <Route key={index} path={item.path} render={() => <RouterPage {...this.props} pageInfo={item} />} />;
								}
							})
						}
					</Switch>
				</Drawer>
				<Modal
					visible={this.state.isPicturePreviewShow}
					footer={null}
					destroyOnClose
					onCancel={() => {
						this.setState({
							isPicturePreviewShow: false,
							draggable:false
						});
					}}
				>
					<Slider {...settings}>
						<div>
							<h3><div onClick={this.imgClick} style={{
								height: "300px",
								backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
								backgroundSize:"100%"
							}}></div></h3>
						</div>
						<div>
							<h3><div onClick={this.imgClick} style={{
								height: "300px",
								backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
								backgroundSize:"100%"
							}}></div></h3>
						</div>
						<div>
							<h3><div onClick={this.imgClick} style={{
								height: "300px",
								backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
								backgroundSize:"100%"
							}}></div></h3>
						</div>
						<div>
							<h3><div onClick={this.imgClick} style={{
								height: "300px",
								backgroundImage: `url(https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png)`,
								backgroundSize:"100%"
							}}></div></h3>
						</div>
					</Slider>
					{/* <img
						src={this.state.previewImgUrl}
						alt={this.state.previewImgUrl}
						style={{ width: "100%", height: "auto" }}
					/> */}
				</Modal>
			</div>
		);
	}

}

export default Form.create()(SchemaPage);
