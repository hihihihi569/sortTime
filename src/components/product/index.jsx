import React, { Component } from 'react'
import DeviceGraph from './product'
export default class Product extends Component {
    render() {
        return (
            <div>                
                <div style={{ margin: '10px', color: '#FBFBFB', fontSize: '18px' }}>聚合被扫链路1</div>
                <DeviceGraph/>
            </div>
        )
    }
}
