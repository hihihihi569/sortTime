import React, { Component, useEffect } from 'react';

import G6 from '@antv/g6';

let graph = null;
let width = 248;
let height = 250;
const fillColors = [
    'rgba(91, 143, 249,0.5)',
    'rgba(90, 216, 166,0.5)',
    'rgba(246, 189, 22,0.5)',
    'rgba(232, 104, 74,0.5)',
    'rgba(255, 157, 77,0.5)',
];
// 三层同心圆
G6.registerNode('area',
    {
        draw(cfg, group) {
            const baseR = 10;

            // Ref line
            let refR = baseR;
            const refInc = 5;
            for (let i = 0; i < 2; i++) {
                group.addShape('circle', {
                    attrs: {
                        x: 0,
                        y: 0,
                        r: (refR += refInc),
                        stroke: '#bae7ff',
                        fill: fillColors[i]
                    },
                    draggable: true,
                    name: 'circle-shape',
                });
            }

            group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: baseR,
                    fill: cfg.centerColor,
                    stroke: 'darkgray',
                },
                name: 'circle-shape',
            },
            );
            if (cfg.label) {
                group.addShape('text', {
                    // attrs: style
                    attrs: {
                        x: 0,
                        y: 0,
                        textAlign: 'center',
                        textBaseline: 'middle',
                        text: cfg.label,
                        fill: 'white',
                        fontStyle: 'bold',
                    },

                    draggable: true,
                    name: 'text-shape',
                });
            }
            return group;
        },
    },
    'circle'
);
//边动画
G6.registerEdge(
    'cubic-running',
    {
        afterDraw(cfg, group) {
            // get the first shape in the group, it is the edge's path here=
            const shape = group.get('children')[0];
            // the start position of the edge's path
            const startPoint = shape.getPoint(0);

            // add red circle shape
            const circle = group.addShape('circle', {
                attrs: {
                    x: startPoint.x,
                    y: startPoint.y,
                    fill: 'RGBA(0,170,255,0.8)',
                    r: 2,
                },
                name: 'circle-shape',
            });

            // animation for the red circle
            circle.animate(
                (ratio) => {
                    // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                    // get the position on the edge according to the ratio
                    const tmpPoint = shape.getPoint(ratio);
                    // returns the modified configurations here, x and y here
                    return {
                        x: tmpPoint.x,
                        y: tmpPoint.y,
                    };
                },
                {
                    repeat: true, // Whether executes the animation repeatly
                    duration: 3000, // the duration for executing once
                },
            );
        },
    },
    'link', // extend the built-in edge 'cubic'
);
/** data */
const data = {
    nodes: [
        {
            id: 'nodeD',
            label: 'F-GTCG',
            type: 'area',
            centerColor: '#5b8ff9',
            comboId: 'combo1'
        },
        {
            id: 'nodeD2',
            label: 'F-BIFS',
            type: 'area',
            centerColor: '#5b8ff9',
            comboId: 'combo1'
        },
        {
            id: 'nodeD3',
            label: 'F-SAES',
            type: 'area',
            centerColor: '#5b8ff9',
            comboId: 'combo1'
        },
        {
            id: 'nodeD4',
            label: 'F-CCAP',
            type: 'area',
            centerColor: '#5b8ff9',
            comboId: 'combo1'
        },
        {
            id: 'nodeD5',
            label: 'F-BOOM',
            type: 'area',
            centerColor: '#5b8ff9',
            comboId: 'combo1'
        },
    ],
    edges: [
        {
            source: 'nodeD',
            target: 'nodeD2',
            type: 'cubic-running',
        },
        {
            source: 'nodeD2',
            target: 'nodeD3',
            type: 'cubic-running',
        },
        {
            source: 'nodeD3',
            target: 'nodeD4',
            type: 'cubic-running',
        },
        {
            source: 'nodeD4',
            target: 'nodeD5',
            type: 'cubic-running',

        },
        {
            source: 'nodeD5',
            target: 'nodeD',
            style: {
                stroke: "RGBA(0,0,0,0)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
    ],
    combos: [
        { id: 'combo1', label: '产品1', fixSize: 80, },
    ],
};
//  goDetaill=()=> {
//             this.props.history.push("/time/history");
//         }
const TestGraph = () => {
    const container = React.useRef(null);
    useEffect(() => {
        const graph = new G6.Graph({
            container: container.current,
            width,
            height,
            groupByTypes: false,
            layout: {
                type: 'circular',
                radius: 70,
            },
            // modes: {
            //     default: ['drag-combo'],
            // },
            defaultNode: {
                position: 'center',
            },
            defaultEdge: {
                style: {
                    stroke: "RGBA(0,170,255,0.8)",
                    lineWidth: 3,
                    lineDash: [2, 2]
                },
            },
            defaultCombo: {
                type: 'circle',
                position: 'center',
                style: {
                    lineWidth: 1,
                    fill: 'RGBA(0,170,255,0.2)',
                    stroke: "#2b2f33",
                },
                labelCfg: {
                    refY: 0,
                    refX: 0,
                    position: 'center',
                    style: {
                        fill: '#fff',
                    }
                },
            },
        });
        // 点击跳转
        graph.on('combo:click', function () {
            goDetail()
        });       

        graph.data(data);
        graph.render();
    })

    if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    function goDetail () {
        window.open(`/time/product?id=111`)
        // window.location.href = '/time/product?id=111'
    };
    

    return (
        <>
            <div style={{ flex: 1, backgroundColor: 'RGBA(0,0,0,0)', display: 'flex', alignItems: 'center',justifyContent: 'space-around',position:'relative' }} >
                <div
                    ref={container}
                />
            </div>
        </>
    )
}
export default TestGraph