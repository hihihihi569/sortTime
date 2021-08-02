import React, { Component } from 'react';

import { Layout, Menu } from 'antd';
import { router } from '../../router';
import { Link, } from 'react-router-dom';

const { Header, } = Layout;
export default class LayoutBar extends Component {
    state = {
        current: '1',
    };
    handleClick = e => {
        this.setState({ current: e.key });
    };
    componentDidMount() {
        var test = window.location.pathname;
        switch(test){
            case '/time/dashboard':  this.setState({ current: '1' });break;
            case '/time/product':  this.setState({ current: '2' });break;
            case '/time/allocation':  this.setState({ current: '3' });break;
        }
    }
    render() {
        const { current } = this.state;
        return (
            <div>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" onClick={this.handleClick} selectedKeys={[current]}>
                            {
                                router.map((res) => {
                                    return (
                                        <Menu.Item key={res.id}>
                                            <Link to={res.path}>
                                                {res.icon} {res.title}
                                            </Link>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Header>
                </Layout>
            </div>
        )
    }
}
