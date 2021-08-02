import React, { Component } from 'react'
import TpsNotNormal from './TpsNotNormal'
export default class Tps30min extends Component {
    render() {
        return (
            <div className="TpsNotNormal">
                <div style={{ margin: '0 10px',padding:'10px 0 0', color: 'rgb(24, 144, 255)', fontSize: '18px' }}>最近30分钟TPS</div>
                <TpsNotNormal/>
            </div>
        )
    }
}
