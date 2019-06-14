import React, { Component } from 'react';
import { Button, Form, Select, Affix, Input, Upload, message, Row, Col, Icon, Modal, Radio, Drawer, Table, Divider } from 'antd';
import PageNav from "../components/page.nav";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class Apply extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            member:[],
            cc:[],
            fileList1:[],
            courseList:[],//明细
        }
    }
    columns=[
		{
			title: '费用类别',
			dataIndex: 'title',
			key: 'title',
			align:"center"
		}, {
			title: '说明',
			dataIndex: 'description',
			key: 'description',
			align:"center",
			render: text => text ? text : "未填写"
		}, {
			title: '报销金额（元）',
			dataIndex: 'price',
			key: 'price',
			align:"center",
		}, {
			title: '费用凭证',
			key: 'fujian',
			dataIndex: 'fujian',
			align:"center",
		},{
			title: '操作',
			key: 'action',
			dataIndex: 'action',
			align:"center",
			render: (text,record,index) => (
				<span>
					<a>删除 </a>
				</span>
			),
        }
    ]

    showDrawer = async () => {
        this.setState({
            visible: true
		});
    }

    onSubmit = () => {
        this.props.form.validateFields(["aa"],async (err, values) => {
            if(!err){
                console.log(values)
            }
        })
    }
    
    render() {
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const span = 12;
        return (
            <div>
				<Affix offsetTop={0}>
					<PageNav reloadData={this.reloadData} history={this.props.history} pageInfo={this.props.pageInfo} />
				</Affix>
                <Form>
					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="费用名称">
								{getFieldDecorator('aa.title', {
									rules: [
										{
											required: true,
											message: '请输入费用名称!',
											whitespace: true,
										}
									],
								})(<Input placeholder="请输入费用名称"/>)}
							</FormItem>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="是否关联项目">
								{getFieldDecorator('aa.relation', {
									rules: [
										{
											required: true,
											message: '请选择是否关联项目!',
											whitespace: true,
										}
									],
								})(
                                    <Radio.Group>
                                        <Radio value="是">是</Radio>
                                        <Radio value="否">否</Radio>
                                    </Radio.Group>
                                )}
							</FormItem>
						</Col>
					</Row>
                    {
                        this.props.form.getFieldValue("aa.relation") === "是" ? (
                            <Row type="flex" justify="center">
                                <Col span={span}>
                                    <FormItem label="费用所属项目">
                                        {getFieldDecorator('aa.subordinate', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择费用所属项目!',
                                                    whitespace: true,
                                                }
                                            ],
                                        })(
                                            <Select placeholder="请选择">
                                                {/* {
                                                    this.state.category.length > 0 ? this.state.category.map((item,index) => {
                                                        return (
                                                            <Option key={index} value={item.exName}>{item.exName}</Option>
                                                        )
                                                    }) : null
                                                } */}
                                                <Option value="1">项目1</Option>
                                                <Option value="项目2">项目2</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        ) : null
                    }
					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="费用报销说明">
								{getFieldDecorator('aa.introduction', {
								})(<TextArea placeholder="请输入费用报销说明" autosize={{ minRows: 2, maxRows: 6 }} />)}
							</FormItem>
						</Col>
					</Row>

					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="审批人">
								{
									getFieldDecorator('aa.approver', {
										rules: [{
											required: true,
											message: '请选择审批人'
										}],

									})(
										<Select
											placeholder="请选择"
											labelInValue
											style={{ width: '100%' }}
											getPopupContainer={triggerNode => triggerNode.parentNode}
										>
										{
											this.state.member.length>0 ? this.state.member.map(item => {
												return (
													<Option value={item.piUuid+"/"+item.omName} key={item.piUuid}>
														{item.omName}
													</Option>
												)
											}) : null
										}
									</Select>
									)
								}
							</FormItem>
						</Col>
					</Row>

					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="抄送人">
								{
									getFieldDecorator('aa.cc', {
									})(
										<Select
											placeholder="请选择"
											mode="multiple"
											labelInValue
											style={{ width: '100%' }}
											getPopupContainer={triggerNode => triggerNode.parentNode}
										>
										{
											this.state.cc.length>0 ? this.state.cc.map(item => {
												return (
													<Option value={item.piUuid+"/"+item.omName} key={item.piUuid}>
														{item.omName}
													</Option>
												)
											}) : null
										}
									</Select>
									)
								}
							</FormItem>
						</Col>
					</Row>

					<Row type="flex" justify="center">
						<Col span={span}>
							<FormItem label="新增报销明细">
								{getFieldDecorator('aa.add', {
									rules: [
										{
											message: '请选择新增课程!'  
										}
									],
								})(
									<Button type="dashed" 
										onClick={this.showDrawer} 
										style={{ width: '100%' }}>
										<Icon type="plus" />新增报销明细
									</Button>
								)}
							</FormItem>
						</Col>
					</Row>

					<Row type="flex" justify="center">
						<Col span={16}>
						{this.state.courseList&&this.state.courseList.length>0?
							<div className="party-table">
								<Table
									bordered
									size="middle"
									columns={this.columns} 
									dataSource={this.state.courseList}  
									rowKey={(record)=>record.id}
									pagination={{showSizeChanger: true, showQuickJumper: true}}
								/>
							</div>
							:null} 
						
						</Col>
					</Row>
					
					<Row type="flex" justify="center">
						<FormItem style={{ textAlign: 'center' }}>
							<Button onClick={this.onSubmit} type="primary" >
								提交
							</Button>
						</FormItem>
					</Row>
				</Form>
				<Drawer
					width={600}
					title="报销明细"
					closable={false}
					onClose={() => {
                        this.setState({
                            visible:false
                        })
                    }}
					visible={this.state.visible}>
					<Form>
						<Row type="flex" justify="center">
							<Col span={span}>
								<FormItem label="费用类别">
									{getFieldDecorator('bb.title', {
										rules: [
											{
												required: true,
												message: '请选择费用类别!',
												whitespace: true,
											}
										],
									})(
										<Select placeholder="请选择">
											{/* {
												this.state.category.length > 0 ? this.state.category.map((item,index) => {
													return (
														<Option key={index} value={item.exName}>{item.exName}</Option>
													)
												}) : null
                                            } */}
                                            <Option value="交通费">交通费</Option>
                                            <Option value="住宿费">住宿费</Option>
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row type="flex" justify="center">
							<Col span={span}>
								<FormItem label="说明">
									{
										getFieldDecorator('bb.description',{
											// rules: [
											// 	{
											// 		required: true,
											// 		message: '请输入说明!',
											// 		whitespace: true,
											// 	}
											// ],
										})(
											<TextArea placeholder="如果是商品请填写规格" autosize={{ minRows: 2, maxRows: 6 }} />
										)
									}
								</FormItem>
							</Col>
						</Row>
						<Row type="flex" justify="center">
							<Col span={span}>
								<FormItem label="报销金额">
									{getFieldDecorator('bb.price', {
										rules: [
											{
												required: true,
												pattern:/^[0-9]+(.[0-9]{0,2})?$/,
												message: '请输入报销金额,最多保留两位小数!',
												whitespace: true,
											}
										],
									})(<Input placeholder="请输入报销金额"/>)}
								</FormItem>
							</Col>
						</Row>
						<Row type="flex" justify="center">
							<Col span={span}>
								<FormItem label="费用凭证">
									{getFieldDecorator('bb.fujian', {
										rules: [
											{
												required: true,
												message: "请上传凭证",
											}
										],
									})(
										<Upload
											name="avatar"
											listType="picture-card"
											className="avatar-uploader"
											onPreview={this.handlePreview}
											fileList={this.state.fileList1}
											data={file => ({
													photoWidth: 340, // 通过  handleBeforeUpload 获取 图片的宽高
													photoHeight: 340,
												})
											}
											onRemove={File => {
												this.setState(prevState => {
													return {
														fileList1: prevState.fileList1.filter(
															item => {
																if (
																	item.name !=
																	File.name
																) {
																	return item;
																}
															}
														)
													};
												});
											}}
											onChange={info => {
												// 主控上传图片
												if (
													info &&
													info.file &&
													info.file.path
												) {
													// 获取文件hash
													const fileHashRes = ipcRenderer.sendSync(
														"get-file-hash",
														info.file.path
													);
													// 采用异步方式上传图片
													this.setState(prevState => {
														fileList1: prevState.fileList1.push(
															{
																name: info.file.name,
																uid: info.file.uid,
																status: "done",
																url: `http://127.0.0.1:8080/ipfs/${
																	fileHashRes[
																		fileHashRes.length -
																			1
																	].hash
																}`
															}
														);
													});
													// ipcRenderer.send('upload-file', {
													//   object: 'platform',
													//   filePath: info.file.path,
													// })
												}
											}}
											beforeUpload={file => {
												this.setState({
													fileState: 1
												});
												return false;
											}}
										>
											{this.state.fileList1.length < 5 ? (
												<div>
													<Icon type="plus" />
													<div className="ant-upload-text">
														上传附件
													</div>
												</div>
											) : null}
										</Upload>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={2} offset={11}>
								<Button type="primary" onClick={this.handleSublimt}>保存</Button>
							</Col>
						</Row>
					</Form>
				</Drawer>
            </div>
        )
    }
}

export default Form.create()(Apply)