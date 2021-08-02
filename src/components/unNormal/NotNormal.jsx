import React, { Component } from 'react';
import * as G2 from '@antv/g2';
G2.registerShape('interval', 'borderRadius', {
    draw: function draw(cfg, container) {
        var points = cfg.points;
        var path = [];
        path.push(['M', points[0].x, points[0].y]);
        path.push(['L', points[1].x, points[1].y]);
        path.push(['L', points[2].x, points[2].y]);
        path.push(['L', points[3].x, points[3].y]);
        path.push('Z');
        path = this.parsePath(path); // 将 0 - 1 转化为画布坐标
        return container.addShape('rect', {
            attrs: {
                x: path[1][1], // 矩形起始点为左上角
                y: path[1][2],
                width: path[2][1] - path[1][1],
                height: path[0][2] - path[1][2],
                fill: cfg.color,
                radius: (path[2][1] - path[1][1]) / 3
            }
        });
    }
});

export class NotNormal extends Component {
  componentDidMount() {
    var data = [{
        time: 'F-GTCG',
        waiting: 2,
      }, {
        time: 'F-BIFS',
        waiting: 6,
      }, {
        time: 'F-SAES',
        waiting: 2,
      }, {
        time: 'F-CCAP',
        waiting: 9,
      }, {
        time: 'F-BOOM',
        waiting: 2,
      }
    ];
    
      var chart = new G2.Chart({
        container: 'NotNormal',
        width:400,
        height:130
      });
      chart.source(data, {    
        people: {
          min: 0
        },
        waiting: {
          min: 0
        }
      });
      chart.scale('waiting', {
        tickInterval: 2
      });
     chart.axis('people',false);
      chart.interval().position('time*waiting').color('#3182bd').shape('borderRadius').label('waiting');
      chart.line().position('time*waiting').color('#fdae6b').size(3).shape('smooth');
      chart.point().position('time*waiting').color('#fdae6b').size(2).shape('circle');
      chart.render();
      }

  render() {
    return (
        <div id='NotNormal' ></div>
    )
  }
}

export default NotNormal