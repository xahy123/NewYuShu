export default {
	//应用布局路由
	layout: [],
	//应用左侧菜单路由
	leftMenu: {
		title: "我的报销",
		icon: "",
		defautPath: "",
		defautPage: "",
		menuItems: [
			{
				title: "报销",
				path: "",
				icon: "",
				page: "",
				subMenus: [
					{
						title: "首页",
						subTitle: "",
						path: "/index",
						icon: "",
						page: "index"
					},{
						title: "报销申请",
						subTitle: "",
						path: "/apply",
						icon: "",
						page: "apply"
					},{
						title: "我的报销记录",
						subTitle: "",
						path: "/my.reimbursement",
						icon: "",
						page: "my.reimbursement"
					},{
						title: "我的报销记录",
						subTitle: "",
						path: "/record",
						icon: "",
						page: "record"
					},
					
					// {
					// 	title: "报销统计",
					// 	subTitle: "",
					// 	path: "/statistics",
					// 	icon: "",
					// 	page: "statistics"
					// },
				]
			}
		]
	},
	// myReimbursementPageDrawer: [
	// 	{
	// 		title: "新增报销申请",
	// 		path: "/my.reimbursement/add",
	// 		icon: "",
	// 		page: "my.reimbursement.add"
	// 	},
	// ]
};
