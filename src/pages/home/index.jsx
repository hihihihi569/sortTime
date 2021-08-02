import React, { Component } from 'react';
import HeaderComponent from '../../components/header/header';
import TestGraph from '../../components/test';
import TolNum from '../../components/tolNum';
import RealtimeTra from '../../components/RealtimeTra';
import BaseInfo from '../../components/baseInfo';
var isDown = false;
export default class Home extends Component {
    componentDidMount() {
        var dv = document.getElementById('dv').childNodes;
        var x = 0;
        var y = 0;
        var l = 0;
        var t = 0;

        for (let i = 0; i < dv.length; i++) {

            dv[i].onmousedown = function (e) {
                console.log('e', e)
                //获取鼠标的x坐标和y坐标
                x = e.clientX;
                y = e.clientY;
                //获取左部和顶部的偏移量
                l = e.clientX - dv[i].offsetLeft;
                t = e.clientY - dv[i].offsetTop;

                //开关打开
                isDown = true;
                //设置样式  
                dv[i].style.cursor = 'move';
                window.onmousemove = function (e) {
                    if (isDown == false) {
                        return;
                    }

                    //计算移动后的左偏移量和顶部的偏移量
                    var nl = e.clientX - x;
                    var nt = e.clientY - y;
                    dv[i].style.left = nl + 'px';
                    dv[i].style.top = nt + 'px';
                }
                window.onmouseup = function () {      //当鼠标松开后关闭移动事件和自身事件
                    //开关关闭
                    isDown = false;
                    dv[i].style.cursor = 'default';
                }
            }
        }

    }

    render() {
        return (
            <div style={{ backgroundColor: '#101010', }} >
                <HeaderComponent />

                <div style={{ display: 'flex', backgroundColor: '#101010', }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-around', flexWrap: ' wrap', width: '60%', position: 'relative',
                        overflow: 'hidden', backgroundColor: '#101010', margin: '0 20px',
                    }} id='dv' >
                        <TestGraph />
                        <TestGraph />
                        <TestGraph />
                        <TestGraph />
                        <TestGraph />
                    </div>
                    <div style={{
                        display: 'flex', justifyContent: 'space-around', flexWrap: ' wrap', width: '40%', position: 'relative',
                        overflow: 'hidden', backgroundColor: '#101010', color: '#fff'
                    }} className="rightContent">
                        <RealtimeTra />
                        <BaseInfo />
                        <TolNum />
                    </div>
                </div>
            </div>

        )
    }
}
