import React, { Component } from "react";
import PageNav from "../components/page.nav";
import { Bar  } from 'ant-design-pro/lib/Charts';
import { Affix } from "antd";

import moment from 'moment';

class Statistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visitData:[]
        }
    }

    componentDidMount() {
        console.log(moment(new Date().getTime()).format("ll"))
        let visitData = [];
        let beginDay = new Date().getTime();
        for (let i = 0; i < 8; i += 1) {
            visitData.push({
                x: parseInt(moment(new Date(beginDay)).format('MM'))+i,
                y: Math.floor(Math.random() * 100) + 10,
            });
        }
        this.setState({
            visitData
        })
    }

    render() {
        return (
            <div>
                <Affix offsetTop={0}>
					<PageNav reloadData={this.reloadData} history={this.props.history} pageInfo={this.props.pageInfo} />
				</Affix>
                <div>
                    <Bar
                        height={500}
                        title="报销金额统计"
                        data={this.state.visitData}
                    />
                </div>
            </div>
        )
    }
}

export default Statistics;
