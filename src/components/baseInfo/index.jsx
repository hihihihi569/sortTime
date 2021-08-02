import React, { Component } from 'react'
import UnLineGraph from '../Donut';
import DemoPie from '../Donut/Dount1';
import BarChart from '../Donut/Dount2';

export default class BaseInfo extends Component {
    render() {
        return (
            <div className="baseinfo">
                <div style={{ borderBottom: '2px solid #1890ff', margin: '0 10px',padding:'10px 0', color: 'rgb(24, 144, 255)', fontSize:'18px' }}>
                    基本信息
                </div>
                <div style={{
                    display: 'flex', width: '100%', justifyContent: 'center', position: 'absolute', bottom: '10px',
                    textAlign: 'center'
                }}>
                    <div className='mar20'>
                        <BarChart />
                        <span style={{ color: '#6DD400' }}>产品数目</span>
                    </div>
                    <div className='mar20'>
                        <DemoPie />
                        <span style={{ color: '#AA0000' }}>异常数目</span>
                    </div>
                    <div className='mar20'>
                        <UnLineGraph />
                        <span style={{ color: '#AAAAAA' }}>待上线</span>
                    </div>
                </div>
            </div>
        )
    }
}
