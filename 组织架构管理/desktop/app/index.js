import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import MainLayout from "./layout/main.js";

import routers from "./routers.js";

import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

import { webFrame, remote } from "electron";
// webFrame.setZoomFactor(remote.getGlobal("sharedObject").userenv.zoomFactor);
webFrame.setZoomFactor(remote.getGlobal("sharedObject").userenv.zoomFactor ? remote.getGlobal("sharedObject").userenv.zoomFactor : 1.0);


import hotkeys from "hotkeys-js";

hotkeys("ctrl++,ctrl+=,ctrl+-", function(event, handler) {
	switch (handler.key) {
		case "ctrl+=":
		case "ctrl++":
			if (webFrame.getZoomFactor() < 2.0) {
				webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.2);
			}
			break;
		case "ctrl+-":		
			if (webFrame.getZoomFactor() > 0.8) {
				webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.2);
			}
			break;
	}
});

ReactDOM.render(
	<LocaleProvider locale={zh_CN}>
		<HashRouter>
			<Switch>
				{routers.layout.map((item, index) => {
					return <Route path={item.path} component={require(`./layout/${item.page}`)} key={index} />;
				})}
				<Route path="/" component={MainLayout} />
			</Switch>
		</HashRouter>
	</LocaleProvider>,
	document.getElementById("root")
);
