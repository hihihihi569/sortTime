
import React, { Component } from 'react';
import * as G2 from '@antv/g2';

const fillColors = [
    'rgba(91, 143, 249,0.5)',
    'rgba(90, 216, 166,0.5)',
    'rgba(246, 189, 22,0.5)',
    'rgba(232, 104, 74,0.5)',
    'rgba(255, 157, 77,0.5)',
];

G2.registerShape('point', 'ConcentricCircle', {
    draw: function draw(cfg, container) {
        let refR = cfg.data.value/2;
        let basR = cfg.data.value/2;
        const refInc = 5;
        for (let i = 0; i < 2; i++) {
            container.addShape('circle', {
                attrs: {
                    x: cfg.x,
                    y: cfg.y,
                    r: (refR += refInc),
                    stroke: '#bae7ff',
                    fill: fillColors[i]
                },
                draggable: true,
                name: 'circle-shape',
            });
        } // 将 0 - 1 转化为画布坐标
       
        return  container.addShape('circle', {
            attrs: {
                x: cfg.x,
                y: cfg.y,
                r: basR,
                fill: cfg.color,
                stroke: 'darkgray',
            },
            name: 'circle-shape',
        },
        );
    }
});
const data = [
    { name: 'Internet Explorer', value: 26 },
    { name: 'Chrome', value: 40 },
    { name: 'Firefox', value: 30 },
    { name: 'Safari', value: 24 },
    { name: 'Opera', value: 15 },
    { name: 'Undetectable', value: 8 }
];

export class TpsNotNormal extends Component {
    componentDidMount() {
        const chart = new G2.Chart({
            container: 'TpsNotNormal',
            width:400,
            height: 130,
        });
        chart.data(data);
        chart.scale('value', {
            nice: false,
            max: 60,
            min: 0
        });
        chart.legend(false);
        chart.axis('value', false);
        chart.axis('name', false);
        chart.tooltip({
            showMarkers: false,
        });
        chart.point().position('name*value')
            .size('value', (value) => {
                return value
            })
            .color('name')
            .style({
                fill: '#ccc',
                fillOpacity: 1,
                stroke: '#ccc'
            })
            .shape('ConcentricCircle')
            .label('value', {
                offset: 0,
                style: {
                    fontSize: 12,// 文本大小                    
                    fill: '#000',
                    stroke: '#000',
                }
            });
        chart.render();
    }
    render() {
        return (
            <div id='TpsNotNormal' style={{ backgroundColor: 'RGBA(0,0,0,0)',textAlign:'center' }}></div>
        )
    }
}


export default TpsNotNormal

