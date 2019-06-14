import React, { Component, Fragment } from "react";
import PageNav from "../components/page.nav";
// import PageNav from "@yuanshutech/app-commons/components/page.nav";
import SyntaxHighlighter from "react-syntax-highlighter";
import HighlighterWords from "react-highlight-words";
import { Button, Table, Modal, Form, Affix, Input, message, Tooltip, Tabs, Tree, Row, Col, Popconfirm, Drawer } from "antd";
const TabPane = Tabs.TabPane;
const { TreeNode } = Tree;
// import moment from "moment";
//导入service
import '../assets/js/jquery.min';
import $ from 'jquery';
// import 'https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-alpha.9/dist/html2canvas.min.js';
// import "orgchart";

import 'font-awesome/css/font-awesome.css';
import '../assets/style/init.css';
import '../assets/style/jquery.jOrgChart.css';
// import html2canvas from 'html2canvas';

import '../assets/js/html2canvas.min';
import '../assets/js/jspdf.min';
import '../assets/js/jquery.orgchart';





const FormItem = Form.Item; // form表单
class SchemaPage extends Component {
	state = { 
		drawerVisible:false
	};

	data = [
		{
		  key: 1,
		  name: '会计部',
		  decode: 60,
		  address: 'New York No. 1 Lake Park',
		  children: [
			{
			  key: 11,
			  name: '会计部1',
			  decode: 42,
			  address: 'New York No. 2 Lake Park',
			},
			{
			  key: 12,
			  name: '会计部2',
			  decode: 30,
			  address: 'New York No. 3 Lake Park',
			  children: [
				{
				  key: 121,
				  name: '会计部2-1',
				  decode: 16,
				  address: 'New York No. 3 Lake Park',
				},
			  ],
			},
			{
			  key: 13,
			  name: '会计部3',
			  decode: 72,
			  address: 'London No. 1 Lake Park',
			  children: [
				{
				  key: 131,
				  name: '会计部3-1',
				  decode: 42,
				  address: 'London No. 2 Lake Park',
				  children: [
					{
					  key: 1311,
					  name: '会计部3-1-1',
					  decode: 25,
					  address: 'London No. 3 Lake Park',
					},
					{
					  key: 1312,
					  name: '会计部3-1-2',
					  decode: 18,
					  address: 'London No. 4 Lake Park',
					},
				  ],
				},
			  ],
			},
		  ],
		},
		{
		  key: 2,
		  name: '采购部',
		  hobby: '游泳',
		  decode: 32,
		  address: 'Sidney No. 1 Lake Park',
		},
	];

	columns = [
		{
            title: '部门名称',
            dataIndex: 'name',
			key: 'name',
			// align:"center",
			render:text => {
				if(text.length>7){
					return (
						<Tooltip title={text} style={{marginLeft:50}}>
							<span>{text.substring(0,7)}……</span>
						</Tooltip>
					)
				}else{
					return (
                            <span>{text}</span>
                    )
				}
			}
        }, {
            title: '部门编码',
            dataIndex: 'deCode',
			key: 'deCode',
			width: '20%',
			align:"center",
        }, {
            title: '创建时间',
            dataIndex: 'deCrea',
			key: 'deCrea',
			width: '20%',
			align:"center",
			// render: (text) => moment(text).format("YYYY-MM-DD")
        },{
            title: '岗位',
            dataIndex: '',
			key: '',
			align:"center",
			width: '20%',
			render: (text,record,index) => {
				return (
					index%2 ? <span><a onClick={() => this.editPostPeople(text)}>会计</a>/李淑芬</span> : <span><a onClick={() => this.addPostPeople(text)}>采购经理</a></span>
				)
			} 
        }, {
            title: '操作',
			key: 'action',
			// width: '30%',
			align:"center",
            render:(text,record)=>{
            	return (
            		<span>
						<a onClick={() => this.addPost(text)}>添加岗位</a>
            			<a style={{marginLeft:10}} onClick={() => this.add(text)}>添加子部门</a>
            			<a style={{marginLeft:10}} onClick={() => this.delete(text)}>删除</a>
            			<a style={{marginLeft:10}} onClick={() => this.edit(text)}>编辑</a>
            		</span>
            	)
            }
        }
	];
	add = (text) => {
		this.setState({
			visible:true,
			num:1,
			superiorCode:text.deCode,
			title:"新建部门",
			name:undefined,
			formStatus:1
		})
	}
	addPost = (text) => {
		this.setState({
			visible:true,
			num:1,
			superiorCode:text.deCode,
			title:"添加岗位/岗位人员",
			formStatus:0
		})
	}
	addPostPeople = (text) => {
		this.setState({
			visible:true,
			num:1,
			superiorCode:text.deCode,
			title:"编辑岗位/添加岗位人员",
			formStatus:2
		})
	}
	editPostPeople = (text) => {
		this.setState({
			visible:true,
			num:1,
			superiorCode:text.deCode,
			title:"编辑岗位/添加岗位人员",
			formStatus:2
		})
	}
	delete = async (text) => {
        let data = await service.getNewDepartment(text.deCode);
		let code = undefined;
		this.getInit(code);
		if(data.result[0].deFlag){
			let res = await service.deleteDepartment(data.result[0].deCode);
			if(res.result && !res.statusCode){
                message.success("删除成功");
                let code = undefined;
				this.getInit(code);
			}else{
				message.error("删除失败"+res.message);
			}
		}else{
			message.info("该部门含有子部门或被其它应用所引用，暂时不能删除")
		}
		
	}
	edit = (text) => {
		this.setState({
			visible:true,
			num:2,
			superiorCode:text.pid,
			departmentCoding:text.deCode,
			title:"编辑部门",
			name:text.name,
			formStatus:1
		})
	}
	
	async componentDidMount() {
		var _this = this;
		if(this.data.length > 1){
			var x = {key:0,name:"测试",address:"wsrgs",children:[]};
			this.data.map(item => {
				x.children.push(item)
			});
			console.log(x)
			let getId = function() {
				return (new Date().getTime()) * 1000 + Math.floor(Math.random() * 1001);
			};
			// var oc = $('#chart-container').orgchart({
			// 	'data' : datascource,
			// 	'chartClass': 'edit-state',
			// 	'parentNodeSymbol': 'fa-th-large',
			// });
			// const options = {
			// 	'data' : x, // 数据源
			// 	'pan' : true,
			// 	'zoom' : true,
			// 	'depth': 20,
			// 	'createNode' : function($node, data) {
			// 		console.log($node)
			// 	},
			// 	'nodeContent': 'address',
			// 	// 'exportButton': true,
			// 		// 'exportFilename': 'MyOrgChart'
			// };
			$("#jOrgChart").html("");
			// $("#jOrgChart").orgchart(options);
			let oc = $("#jOrgChart").orgchart({
				'data' : x, // 数据源
				'pan' : true,
				'zoom' : true,
				'depth': 20,
				'createNode' : function($node, data) {
					$node[0].id = getId();
				},
				'nodeContent': 'address',
				'nodeId' : 'address'
			});
			oc.$chartContainer.on('click', '.node', function() {
				var $this = $(this);
				console.log($this);
				console.log($this.find('.title').text());
				_this.setState({
					drawerVisible:true,
				})
				//$('#selected-node').val($this.find('.title').text()).data('node', $this);
			});
		}else{
			const options = {
				'data' : this.data, // 数据源
				'pan' : true,
				'zoom' : true,
				'depth': 20,
				'nodeContent': 'deCrea',
				// 'exportButton': true,
				// 'exportFilename': 'MyOrgChart',
			};
			$("#jOrgChart").html("");
			$("#jOrgChart").orgchart(options);
		}
	}
	getInit = async (code) => {
        function fn(data, pid) {
            let result = [], temp;
            for (let i in data) {
                if (data[i].id == pid) {
                    result.push(data[i]);
                    temp = fn(data, data[i].deCode);
                    if (temp.length > 0) {
                        data[i].children = temp;
                    }
                }
            }
            return result;
		}
		const orgInfo = await getOrganizationByOrgUuid();
		if (orgInfo.statusCode !== 0) {
			return message.error(orgInfo.message);
		}
		this.setState({
			loading:false,
			oiOrnaTitle:orgInfo.result.oiOrna,
			data:fn(y, "0"),
		},() => {
			
		})
	}
	
	handleOk = () => {
		this.props.form.validateFields(async (err, values) => {
			if(!err){
				console.log(values)
			}
		})
	}
	handleCancel = () => {
		this.props.form.resetFields();
		this.setState({
			visible:false
		})
	}
	
	renderTreeNodes = data =>
		data.map(item => {
			if (item.children && item.children.length) {
				return (
				<TreeNode title={item.name} key={item.key} >
					{this.renderTreeNodes(item.children)}
				</TreeNode>
				);
			}
			return <TreeNode title={item.name} key={item.key} />;
		});
	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
			  xs: { span: 24 },
			  sm: { span: 24 },
			  md: { span: 6  },
			  lg: { span: 8 }
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 24 },
			  md: { span: 8 },
			  lg: { span: 8 }
			},
		};
		return (
			<div>
				<Affix offsetTop={0}>
					<PageNav reloadData={this.reloadData} history={this.props.history} pageInfo={this.props.pageInfo} />
				</Affix>
				<Tabs defaultActiveKey="3" style={{display:"block"}}>
					<TabPane tab="树形表格" key="1">
						<Table 
							size="middle"
							defaultExpandAllRows
							dataSource={this.data}
							indentSize={30}
							bordered={true}
							columns={this.columns} 
							pagination={{ showSizeChanger: true, showQuickJumper: true }}
							id='table'
							style={{marginTop:20}}
						/>
					</TabPane>
					<TabPane tab="树形菜单" key="2" style={{display:"block"}}>
						<Row style={{marginTop:20}}>
							<Col span={6} style={{height:window.innerHeight - 140,marginLeft:15,border:"1px solid #eee",overflowY:"scroll"}}>
								<Tree
									defaultExpandAll
									defaultSelectedKeys={["1"]}
									onSelect={(selectedKeys, info) => {
										console.log('selected', selectedKeys);
									}}
								>
									{this.renderTreeNodes(this.data)}
								</Tree>
							</Col>
							<Col span={17} style={{height:window.innerHeight - 140,marginLeft:15,border:"1px solid #eee"}}>
								<Form {...formItemLayout}>
									<FormItem label="组织机构名称">
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: '组织机构名称不能为空' 
												}],
											})(
												<Input />
											)
										}
									</FormItem>
									<FormItem label="上级组织机构名称">
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: '上级组织机构名称' 
												}],
											})(
												<Input disabled/>
											)
										}
									</FormItem>
									<FormItem label="组织机构创建时间">
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: '上级组织机构名称' 
												}],
											})(
												<span></span>
											)
										}
									</FormItem>
									<FormItem label="组织机构编码">
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: '上级组织机构名称' 
												}],
											})(
												<Input disabled/>
											)
										}
									</FormItem>
									<FormItem label="组织机构岗位">
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: '上级组织机构名称' 
												}],
											})(
												<span></span>
											)
										}
									</FormItem>
									<FormItem wrapperCol={{offset:7}}>
										<Button.Group>
											<Button type="primary" style={{marginLeft:10}}>
												保存
											</Button>
											<Button type="primary" onClick={() => this.add(1)} style={{marginLeft:10}}>
												新增同级
											</Button>
											<Button type="primary" onClick={() => this.add(1)} style={{marginLeft:10}}>
												新增下级
											</Button>
											<Popconfirm title="你确定要删除该机构吗？">
												<Button type="danger" style={{marginLeft:10}}>
													删除
												</Button>
											</Popconfirm>
										</Button.Group>
									</FormItem>
								</Form>
							</Col>
						</Row>
						
					</TabPane>
					<TabPane tab="图示" key="3" style={{height:"100%"}}>
						<div id='jOrgChart' style={{marginTop:20,textAlign:"center"}}></div>
					</TabPane>
					<TabPane tab="未定义" key="4">
						<span>未定义</span>
					</TabPane>
				</Tabs>
				{/* <Button type="primary" onClick={() => this.setState({tableNone:!this.state.tableNone})} style={{marginTop:20}}>编辑部门</Button>
				<Button type="primary" disabled={this.state.tableNone ? false : true} onClick={() => this.setState({visible:true,num:1,title:"新建部门",formStatus:1,name:undefined})} style={{marginTop:20,marginLeft:20}}>+新建部门</Button> */}
				{/* <Button type="primary" onClick={
					() => {
						var dom = $("#table");

						var width = dom.width();

						var height = dom.height();

						var type = "png";

						var scaleBy = 3;

						var canvas = document.createElement('canvas');

						canvas.width = width * scaleBy;

						canvas.height = height * scaleBy + 35;

						canvas.style.width = width * scaleBy + 'px';

						canvas.style.height = height * scaleBy + 'px';

						// 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
						html2canvas(document.getElementById("table"),{
							canvas: canvas,
							// dpi: window.devicePixelRatio,
						}).then(canvas => {
							let imgData = canvas.toDataURL('image/png');
        					this.setState({
								htmlUrl:imgData
							})
						})
					}
				}style={{marginTop:20,marginLeft:20}}>一键生成图片</Button> */}
				
				<Modal
					title={this.state.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<Form layout="inline">
						{
							this.state.formStatus === 1 ? (
								<FormItem label="部门名称">
								{
									getFieldDecorator('name',{
										rules:[{
											required:true,
											message:"部门名称不能为空"
										}],
										initialValue:this.state.name ? this.state.name : undefined
									})(
										<Input placeholder="请输入" style={{width:300}}></Input>
									)
								}
								</FormItem>
							) : (
								this.state.formStatus === 0 ? (
									<Fragment>
										<FormItem label="岗位名称">
										{
											getFieldDecorator('postName',{
												rules:[{
													required:true,
													message:"岗位名称不能为空"
												}],
											})(
												<Input placeholder="请输入" style={{width:300}}></Input>
											)
										}
										</FormItem>
										<FormItem label="岗位人员" style={{marginLeft:11}}>
										{
											getFieldDecorator('postPeople',{
											})(
												<Input placeholder="请选择" style={{width:300}}></Input>
											)
										}
										</FormItem>
									</Fragment>
								) : (
									<Fragment>
										<FormItem label="岗位名称">
										{
											getFieldDecorator('postName',{
												rules:[{
													required:true,
													message:"岗位名称不能为空"
												}],
											})(
												<Input placeholder="请输入" style={{width:300}}></Input>
											)
										}
										</FormItem>
										<FormItem label="岗位人员" style={{marginLeft:11}}>
										{
											getFieldDecorator('postPeople',{
											})(
												<Input placeholder="请请选择" style={{width:300}}></Input>
											)
										}
										</FormItem>
									</Fragment>
								)
							)
						}
						
						
					</Form>
				</Modal>
				<Drawer
					// title="Basic Drawer"
					placement="right"
					closable={false}
					width={500}
					onClose={() => {
						this.setState({
							drawerVisible:false
						})
					}}
					visible={this.state.drawerVisible}>
						<Form labelCol={{span:7}} wrapperCol={{span:12}} style={{marginTop:50}}>
							<FormItem label="组织机构名称">
								{
									getFieldDecorator('name', {
										rules: [{ 
											required: true, 
											message: '组织机构名称不能为空' 
										}],
									})(
										<Input />
									)
								}
							</FormItem>
							<FormItem label="上级组织机构名称">
								{
									getFieldDecorator('name', {
										rules: [{ 
											required: true, 
											message: '上级组织机构名称' 
										}],
									})(
										<Input disabled/>
									)
								}
							</FormItem>
							<FormItem label="组织机构创建时间">
								{
									getFieldDecorator('name', {
										rules: [{ 
											required: true, 
											message: '上级组织机构名称' 
										}],
									})(
										<span></span>
									)
								}
							</FormItem>
							<FormItem label="组织机构编码">
								{
									getFieldDecorator('name', {
										rules: [{ 
											required: true, 
											message: '上级组织机构名称' 
										}],
									})(
										<Input disabled/>
									)
								}
							</FormItem>
							<FormItem label="组织机构岗位">
								{
									getFieldDecorator('name', {
										rules: [{ 
											required: true, 
											message: '上级组织机构名称' 
										}],
									})(
										<span></span>
									)
								}
							</FormItem>
							<FormItem wrapperCol={{span:20,offset:2}}>
								<Button.Group>
									<Button type="primary" style={{marginLeft:10}}>
										保存
									</Button>
									<Button type="primary" onClick={() => this.add(1)} style={{marginLeft:10}}>
										新增同级
									</Button>
									<Button type="primary" onClick={() => this.add(1)} style={{marginLeft:10}}>
										新增下级
									</Button>
									<Popconfirm title="你确定要删除该机构吗？">
										<Button type="danger" style={{marginLeft:10}}>
											删除
										</Button>
									</Popconfirm>
								</Button.Group>
							</FormItem>
						</Form>
				</Drawer>
			</div>
		);
	}

	showDrawer = () => {
		this.setState({
			drawerVisible: true
		});
	};

	onCloseDrawer = () => {
		this.setState({
			drawerVisible: false
		});
	};
	
}
export default Form.create()(SchemaPage)

