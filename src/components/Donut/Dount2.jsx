import React, { Component } from 'react'
import { Chart } from '@antv/g2';
export class BarChart extends Component {
  componentDidMount() {
    const data = [
        { item: '产品数', count: 3, percent: 1 },
      ];
      const chart = new Chart({
        container: 'container',
        width:56,
        height: 100,
      });

      chart.data(data);

      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      });

      chart.legend(false);

      chart.coordinate('theta', {
        radius: 1,
        innerRadius: 0.8,
      });
      
      // 辅助文本
      chart
        .annotation()        
        .text({
          position: ['50%', '50%'],
          content: '03',
          style: {
            fontSize: 20,
            fill: '#6DD400',
            textAlign: 'center',
          },
        })
       chart.tooltip(false); 

      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('#6DD400')
        .label('percent', (percent) => {
          return {
            content: (data) => {
              return ``;
            },
          };
        })
        
      chart.interaction('element-active');
      
      chart.render();

  }

  render() {
    return (
        <div id='container' ></div>
    )
  }
}

export default BarChart