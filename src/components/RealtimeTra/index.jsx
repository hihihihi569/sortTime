import React, { Component } from 'react'
import InfiniteRoll from './roll';
export default class RealtimeTra extends Component {
    render() {
        return (
            <div className="realtimeTra">
                <div style={{ margin: '10px', color: 'rgb(24, 144, 255)', fontSize: '18px' }}>
                    实时交易
                <div className='rollTable'>
                        <div>产品名称</div>
                        <div>成功平均值</div>
                        <div>核心交易量</div>
                    </div>
                </div>
                   
                    <InfiniteRoll />
            </div>
        )
    }
}
