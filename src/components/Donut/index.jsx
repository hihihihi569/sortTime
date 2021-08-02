import React, { Component } from 'react'
import { Chart } from '@antv/g2';
export class UnLineGraph extends Component {
  componentDidMount() {
    const data = [
      { item: '产品数', count: 3, percent: 0, color: '#6DD400' },
      { item: '正常数', count: 2, percent: 0, color: '#00AAFF' },
      { item: '报警数', count: 1, percent: 0, color: '#AA0000' },
      { item: '待上线', count: 3, percent: 1, color: '#AAAAAA' },
    ];
    const chart = new Chart({
      container: 'UnLineGraph',
      width: 56,
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
        content: '01',
        style: {
          fontSize: 20,
          fill: '#ccc',
          textAlign: 'center',
        },
      })
    chart.tooltip(false);

    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('color', color => {
        return `${color}`
      })
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
      <div id='UnLineGraph' ></div>
    )
  }
}

export default UnLineGraph