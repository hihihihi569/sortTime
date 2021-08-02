import React, { Component } from 'react';
import HeaderComponent from '../../components/header/header';
import UnNormal from '../../components/unNormal/index'
import RealtimeTra from '../../components/RealtimeTra';
import TolNum from '../../components/tolNum';
import BaseInfo from '../../components/baseInfo';
import Tps30min from '../../components/tps/index'

import Product from '../../components/product/index';
export default class History extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#101010', }} >

                <HeaderComponent />
                <div style={{ backgroundColor: '#101010',display:'flex' }}>
                    <div className="topEle">
                        <Product />
                        <div style={{ display: 'flex', marginRight: '5px'}}>
                            <UnNormal />
                            <RealtimeTra />
                        </div>
                    </div>
                    <div className="bottomEle">
                        <BaseInfo />
                        <TolNum />
                        <Tps30min />
                    </div>
                    {/* <div style={{ backgroundColor: '#101010', }}>
                    <div className="topEle">
                        <Product />
                        <div style={{ width:'40%'}}>
                            <BaseInfo />
                            <TolNum />
                        </div>
                    </div>
                    <div className="bottomEle">
                        <UnNormal />
                        <RealtimeTra />
                        <Tps30min />
                    </div> */}
                    {/* 上面
                    <div style={{
                        display: 'flex', justifyContent: 'space-around', flexWrap: ' wrap', width: '60%', position: 'relative',
                        overflow: 'hidden', backgroundColor: '#101010', margin: '0 20px',
                    }} >

                        <Product />
                        <div style={{ display:'flex', width:'100%',margin: '0 10px', height: '100%'}}>

                        <UnNormal />
                        <RealtimeTra />
                        </div>
                    </div>
                   下面
                    <div style={{
                        display: 'flex', justifyContent: 'space-around', flexWrap: ' wrap', width: '40%', position: 'relative',
                        overflow: 'hidden', backgroundColor: '#101010', color: '#fff'
                    }} className="rightContent">
                        <RealtimeTra />
                        <BaseInfo />
                        <TolNum />
                    </div> */}
                </div>
            </div>
        )
    }
}
