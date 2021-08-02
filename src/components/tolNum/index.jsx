import React, { Component } from 'react'

export default class TolNum extends Component {
    render() {
        return (
            <div className="tolNum">
                <div style={{  color: 'rgb(24, 144, 255)', fontSize:'18px',borderBottom:'2px solid #1890ff' ,margin:'0 10px',padding:'10px 0'}}>
                    应用总数
                </div>
                <div style={{ display:'flex',width:'100%' ,justifyContent:'center',position:'absolute',bottom:'20px' }}>
                   <div className='normalBg'>0</div>
                   <div className='normalBg'>0</div>
                   <div className='normalBg'>0</div>
                   <div className='normalBg'>0</div>
                   <div className='normalBg'>0</div>
                   <div className='alertBg'>6</div>
                </div>

            </div>
        )
    }
}
