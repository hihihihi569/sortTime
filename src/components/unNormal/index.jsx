import React, { Component } from 'react';
import NotNormal from  './NotNormal'

export default class UnNormal extends Component {
    render() {
        return (
            <div className="NotNormal">
                <div style={{ margin: '0 10px',padding:'10px 0 0', color: 'rgb(24, 144, 255)', fontSize: '18px' }}>近30分钟异常次数</div>
                <NotNormal/>
            </div>
        )
    }
}
