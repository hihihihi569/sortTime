import React, { Component, useEffect } from 'react';

import { uniqueId } from '@antv/util';
import G6 from '@antv/g6';
import Chart from '@antv/chart-node-g6';
let graph = null;
let width = 600;
let height = 300;
const currentNodeMap = {};
let maxCount = -Infinity;
let minCount = Infinity;
const fillColors = [
    'rgba(91, 143, 249,0.5)',
    'rgba(90, 216, 166,0.5)',
    'rgba(246, 189, 22,0.5)',
    'rgba(232, 104, 74,0.5)',
    'rgba(255, 157, 77,0.5)',
];
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
//同心圆
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
                draggable: true,
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
// 扇形
G6.registerNode(
    'sector',
    {
        draw(cfg, group) {
            const keyShape = group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: 5,
                    stroke: 'RGB(0,0,0,0)',
                    fill: 'red',
                    fillOpacity: 0,
                },
            });

            // 实际开发中把 (Chart || window.Chart) 换成 Chart
            const view = new Chart({
                group,
                width: 250,
                height: 125,
                x: -125,
                y: -62.5,
            });

            view.data(cfg.trendData);

            view
                .interval()
                .position('year*population')
                .label('year', {
                    offset: -20,
                })
                
                .color('year')
                .style({
                    lineWidth: 0.5,
                    stroke: '#95de64',
                    fontSize: 2,
                });

            view.axis(false);

            view.legend(false);

            //     // 极坐标下的柱状图
            view.coordinate('polar');

            view.render();

            keyShape.set('intervalView', view);

            return keyShape;
        },
        // update(cfg, item) {
        //     const keyShape = item.getKeyShape();
        //     const view = keyShape.get('intervalView');
        //     view.changeData(cfg.trendData);
        // },
    },
    'single-node',
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
                    r: 3,
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
    'line', // extend the built-in edge 'cubic'
);
// 填充颜色
const colors = [
    'RGB(229,201,26)',
    'RGB(170,0,0)',
    'RGB(0,170,255)',
    '#FBE5A2',
    '#F6C3B7',
    '#B6E3F5',
    '#D3C6EA',
    '#FFD8B8',
    '#AAD8D8',
    '#FFD6E7',
];
// 边框颜色
const strokes = [
    'RGB(229,201,26)',
    'RGB(170,0,0)',
    'RGB(0,170,255)',
    '#F6BD16',
    '#E8684A',
    '#6DC8EC',
    '#9270CA',
    '#FF9D4D',
    '#269A99',
    '#FF99C3',
];
const trendData = [
    { year: '最近一分钟', population: 30 },
    { year: '最近五分钟', population: 30 },
    { year: '更多', population: 30 },
    { year: '最近半小时', population: 30 },
];

// 数据源
const data = {
    nodes: [
        {
            id: '0',
            label: 'F-GTCG',
            trendData: trendData,
            value: 12,
            cluster: 'a',
            type: 'area',
            description: 'this is node 0, \nand the value of it is 10',
        },
        {
            id: '1',
            label: 'F-BIFS',
            trendData: trendData,
            value: 12,
            cluster: 'b',
            type: 'area',
            description: 'this is node 1, \nand the value of it is 20',
        },
        {
            id: '2',
            label: 'F-SAES',
            trendData: trendData,
            value: 12,
            cluster: 'c',
            type: 'area',
            description: 'this is node 2, \nand the value of it is 5',
        },
        {
            id: '3',
            label: 'F-CCAP',
            trendData: trendData,
            value: 12,
            cluster: 'd',
            type: 'area',
            description: 'this is node 3, \nand the value of it is 10',
        },
        {
            id: '4',
            label: 'F-BOOM',
            trendData: trendData,
            value: 12,
            cluster: 'e',
            type: 'area',
            description: 'this is node 4, \nand the value of it is 12',
        },
        {
            id: '5',
            label: 'F-AMC',
            trendData: trendData,
            value: 12,
            cluster: 'f',
            type: 'area',
            description: 'this is node 4, \nand the value of it is 12',
        },

    ],
    edges: [
        {
            id: 'edge0',
            source: '0',
            target: '1',
            type: 'cubic-running',
            style: {
                stroke: "RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge1',
            source: '1',
            target: '2',
            type: 'cubic-running',
            style: {
                stroke: "RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge2',
            source: '2',
            target: '3',
            type: 'cubic-running',
            style: {
                stroke: "RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge3',
            source: '3',
            target: '4',
            type: 'cubic-running',
            style: {
                stroke: "RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge4',
            source: '4',
            target: '5',
            type: 'cubic-running',
            style: {
                stroke: "RGBA(0,170,255,0.8)",
                lineWidth: 2,
                lineDash: [2, 2],
            },
        },
        {
            id: 'edge5',
            source: '5',
            target: '0',
            style: {
                stroke: "RGBA(0,0,0,0)",
                lineWidth: 2,
                lineDash: [2, 2],
            },
        },
    ],
};
// 绘制
const DeviceGraph = () => {
    const container = React.useRef(null);
    useEffect(() => {
        graph = new G6.Graph({
            container: container.current,
            width,
            height,
            layout: {
                type: 'force',
                nodeStrength: 50,
                edgeStrength: 0.7,
                linkDistance: 130,
                preventOverlap: true,
                nodeSpacing: 5,
            },
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            defaultNode: {
                size: [10, 10],
                labelCfg: {
                    position: 'center',
                    offset: 10,
                    style: {
                        fill: '#fff',
                        fontSize: 10
                    },
                }
            },
            defaultEdge: {
                autoRotate: true,
                style: {
                    background: {
                        fill: '#ffffff',
                        stroke: '#000000',
                        padding: [2, 2, 2, 2],
                        radius: 2,
                    },
                },
            },
        });
        // mapping
        const nodes = data.nodes;
        const edges = data.edges;
        const nodeMap = new Map();
        const clusterMap = new Map();
        let clusterId = 0;
        let n = nodes.length;
        let r = 50;
        // 控制node出现成遍历的节点依次是正多边形
        nodes.forEach((node, i) => {
            nodeMap.set(node.id, node);
            // cluster
            if (node.cluster && clusterMap.get(node.cluster) === undefined) {
                clusterMap.set(node.cluster, clusterId);
                clusterId++;
            }
            const cid = clusterMap.get(node.cluster);
            if (!node.style) node.style = {};
            node.style.fill = colors[cid % colors.length];
            node.style.stroke = strokes[cid % strokes.length];

            node.x = width / 2 + r * Math.cos(2 * Math.PI * i / n);
            node.y = height / 2 + r * Math.sin(2 * Math.PI * i / n);
        });
        edges.forEach((edge) => {
            // to avoid the dulplicated id to nodes
            if (!edge.id) edge.id = `edge-${uniqueId()}`;
            else if (edge.id.split('-')[0] !== 'edge') edge.id = `edge-${edge.id}`;
            // TODO: delete the following line after the queried data is correct
            if (!currentNodeMap[edge.source] || !currentNodeMap[edge.target]) {
                return;
            }
            const sourceNode = currentNodeMap[edge.source];
            const targetNode = currentNodeMap[edge.target];
            if (!sourceNode || !targetNode)

                // calculate the degree
                sourceNode.degree++;
            targetNode.degree++;
            sourceNode.outDegree++;
            targetNode.inDegree++;

            if (edge.count > maxCount) maxCount = edge.count;
            if (edge.count < minCount) minCount = edge.count;
        });
        // map the value to node size
        let maxNodeValue = -9999,
            minNodeValue = 9999;
        nodes.forEach(function (n) {
            if (maxNodeValue < n.value) maxNodeValue = n.value;
            if (minNodeValue > n.value) minNodeValue = n.value;
        });
        const nodeSizeRange = [10, 30];
        const nodeSizeDataRange = [minNodeValue, maxNodeValue];

        scaleNodeProp(nodes, 'size', 'value', nodeSizeDataRange, nodeSizeRange);

        nodes.forEach(function (node) {
            node.oriSize = node.size;
            node.oriLabel = node.label;
        });

        function refreshDragedNodePosition(e) {
            const model = e.item.get('model');
            model.fx = e.x;
            model.fy = e.y;
        }
        graph.on('node:dragstart', function (e) {
            graph.layout();
            refreshDragedNodePosition(e);
        });
        graph.on('node:drag', function (e) {
            refreshDragedNodePosition(e);
        });
        graph.on('node:dragend', function (e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });



        graph.on('node:click', function (e) {
            var model = {
                id: e.item.getModel().id,
                type: 'sector',
            };
            // const model ={}
            const node = e.item;
            const states = node.getStates();
            let clicked = false;
            // // const model = node.getModel();
            // // let size = 200;
            // // let labelText = 'NODE: ' + model.id + '\n' + model.description;
            states.forEach(function (state) {
                if (state === 'click') {
                    clicked = true;
                     model = {
                        id: e.item.getModel().id,
                        type: 'area',
                    };
                }else {
                   clicked = false;
                   model= {
                        id: e.item.getModel().id,
                        type: 'sector',            
                    };

                }
            });
            graph.setItemState(node, 'click', !clicked);
            node.update(model);
            graph.layout();
        });

        graph.data(data);
        graph.render();


    })



    if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
        };
    function scaleNodeProp(elements, propName, refPropName, dataRange, outRange) {
        const outLength = outRange[1] - outRange[0];
        const dataLength = dataRange[1] - dataRange[0];
        elements.forEach(function (n) {
            if (propName.split('.')[0] === 'style') {
                if (n.style) {
                    n.style[propName.split('.')[1]] =
                        ((n[refPropName] - 10) * outLength) / 1 + outRange[0];
                } else {
                    n.style = _defineProperty(
                        {},
                        propName.split('.')[1],
                        ((n[refPropName] - 10) * outLength) / 1 + outRange[0],
                    );
                }
            } else {
                n[propName] = ((n[refPropName] - 10) * outLength) / 1 + outRange[0];
            }
        });
    }
    return (
        <>
            <div
                ref={container}
                style={{ backgroundColor: 'RGBA(0,0,0,0)', textAlign: 'center' }}
            />

        </>
    )
}
export default DeviceGraph



