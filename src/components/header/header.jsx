import React, { Component } from 'react'
import moment from 'moment';

export default class HeaderComponent extends Component {
     //添加一个class构造函数
     constructor(props){
        super(props);
        this.state = {now:new Date()};
    }
    
    //挂载
    componentDidMount(){
        this.timerID = setInterval(
            () =>this.tick(),
            1000
        );
    }
    
    //卸载
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    
    //Clock每秒调用这个方法，更新setState
    tick(){
        this.setState({
            now: new Date()
        });
    }

    render() {
        return (
            <div>
                <header style={{ display: 'flex' }}>
                    <div style={{ height: '35px', lineHeight: '35px', flex: 1, borderBottom: 'red', backgroundColor: 'rgba(14, 29, 56, 100)' }}>

                    </div>
                    <div className="tolName" style={{ flex: 1, backgroundColor: 'rgba(14, 29, 56, 100)', color: '#fff', textAlign: "center", fontSize: '24px', height: '70px', lineHeight: '70px' }} >
                        全链路业务监控视图
                     </div>
                    <div style={{ height: '35px', lineHeight: '35px', flex: 1, backgroundColor: 'rgba(14, 29, 56, 100)' }}></div>
                </header>
                <div style={{ height: '44px', margin: '20px' }}>
                    <div style={{ float: 'left',}}>
                        <span style={{ color: '#64E5CE', fontSize: '24px',float: 'left', paddingRight:'20px'}}> {moment(this.state.now).format('HH:mm:ss')}</span>
                        <span style={{color:'#DAF4EF'}}>
                        {moment(this.state.now).format('yyyy年MM月DD日')}
                        <br/>
                        {moment(this.state.now).format('dddd')}
                        </span>
                    </div>
                    <div style={{ float: 'right', color: '#64E5CE',fontSize:'22px',display:'flex' }}>                      
                         


                          <div className="drawPos"></div>  
                            
                            <span >全国</span>
                        </div>
                </div>
            </div>

        )
    }
}
