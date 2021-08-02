import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

const {  Content } = Layout;
export default class LayoutTar extends Component {
    render() {
        return (
            <div>
                <Layout className="layout">    
                    <Content style={{ padding: '0 50px' }}>
                        {this.props.children}
                    </Content>
                   
                </Layout>
            </div>
        )
    }
}
