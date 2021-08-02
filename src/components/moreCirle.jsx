import React, { Component, useEffect } from 'react';

import { uniqueId } from '@antv/util';
import G6 from '@antv/g6';
let graph = null;
let width = 400;
let height = 300;
const currentNodeMap = {};
let maxCount = -Infinity;
let minCount = Infinity;
const countRange = maxCount - minCount;
const minEdgeSize = 1;
const maxEdgeSize = 7;
const edgeSizeRange = maxEdgeSize - minEdgeSize;
let manipulatePosition = undefined;

let labelMaxLength = 5;
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

const data = {
    nodes: [
        {
            id: '0',
            label: 'F-GTCG',
            value: 12,
            cluster: 'a',
            description: 'this is node 0, \nand the value of it is 10',           
        },
        {
            id: '1',
            label: 'F-BIFS',
            value: 12,
            cluster: 'b',
            description: 'this is node 1, \nand the value of it is 20',
        },
        {
            id: '2',
            label: 'F-SAES',
            value: 12,
            cluster: 'c',
            description: 'this is node 2, \nand the value of it is 5',
        },
        {
            id: '3',
            label: 'F-CCAP',
            value: 12,
            cluster: 'd',
            description: 'this is node 3, \nand the value of it is 10',
        },
        {
            id: '4',
            label: 'F-BOOM',
            value: 12,
            cluster: 'e',
            description: 'this is node 4, \nand the value of it is 12',
        },
        {
            id: '5',
            label: 'F-AMC',
            value: 12,
            cluster: 'f',
            description: 'this is node 4, \nand the value of it is 12',
        },

    ],
    edges: [
        {
            id: 'edge0',
            source: '0',
            target: '1',
            type:'cubic-running',
            style: {
                stroke:"RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge1',
            source: '1',
            target: '2',            
            type:'cubic-running',
            style: {
                stroke:"RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge2',
            source: '2',
            target: '3',            
            type:'cubic-running',
            style: {
                stroke:"RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge3',
            source: '3',
            target: '4',
            type:'cubic-running',
            style: {
                stroke:"RGBA(0,170,255,0.8)",
                lineWidth: 3,
                lineDash: [2, 2]
            },
        },
        {
            id: 'edge4',
            source: '4',
            target: '5',
            type:'cubic-running',
            
            style: {
                stroke:"RGBA(0,170,255,0.8)",
                lineWidth: 2,
                lineDash: [2, 2],
                endArrow: {
                    path: G6.Arrow.circle(3, 1),
                    d: 3,
                  },
            },
        },
    ],
};
const labelFormatter = (text, minLength = 10) => {
    if (text && text.split('').length > minLength) return `${text.substr(0, minLength)}...`;
    return text;
  };
const DeviceGraph = () => {
    const container = React.useRef(null);
    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: container.current,
                width,
                height,
                layout: {
                    type: 'force',
                    // direction:'V',
                    nodeStrength: 50,
                    // ordering:null,
                    // collideStrength: 0.5,
                    // alphaDecay: 0.01,
                    edgeStrength:0.7,
                    linkDistance:100,
                    preventOverlap: true, 
                    nodeSpacing:5,
                      
                    // clockwise:true,     
                    // linkDistance: (d) => {
                    //     console.log('d,',d)
                    //     if (d.source.id === '0') {
                    //       return 100;
                    //     }
                    //     return 30;
                    //   },
                    // nodeStrength: (d) => {
                    //     if (d.isLeaf) {
                    //       return -50;
                    //     }
                    //     return -10;
                    //   },
                    //   edgeStrength: (d) => {
                    //     if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
                    //       return 0.7;
                    //     }
                    //     return 0.1;
                    //   },
                },
                modes: {
                    default: ['drag-canvas','drag-node'],
                },
                defaultNode: {
                    size: [10, 10],
                    labelCfg: {
                        position: 'center',
                        offset: 10,
                        style: {
                          fill: '#fff',
                          fontSize:10
                        },
                    }
                },
                // defaultNode: {
                //     position: 'left',
                //     style: {
                //       background: {
                //         fill: '#ffffff',
                //         stroke: 'green',
                //         padding: [3, 2, 3, 2],
                //         radius: 2,
                //         lineWidth: 3,
                //       },
                //     },
                //   },
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
            let n= nodes.length;
            let r=50;
            // for (let i = 0; i <n ; i++) {
            //    console.log("1",width/2 + r * Math.cos(2 * Math.PI * i / n), height/2+ r * Math.sin(2 * Math.PI * i / n));
            //   }
              
            nodes.forEach((node,i) => {
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
                
                //     node.x = width / 2 + 200 * (cid - 0.5);
                //     node.y = height / 2 + 200 * (cid - 0.5);
              
                node.x =width / 2 + r * Math.cos(2 * Math.PI * i / n);
                node.y = height / 2 + r * Math.sin(2 * Math.PI * i / n);
                console.log(node.label,node.x,node.y,i)
            });
            edges.forEach((edge) => {
                // to avoid the dulplicated id to nodes
                if (!edge.id) edge.id = `edge-${uniqueId()}`;
                else if (edge.id.split('-')[0] !== 'edge') edge.id = `edge-${edge.id}`;
                // TODO: delete the following line after the queried data is correct
                if (!currentNodeMap[edge.source] || !currentNodeMap[edge.target]) {
                    console.warn('edge source target does not exist', edge.source, edge.target, edge.id);
                    return;
                }
                const sourceNode = currentNodeMap[edge.source];
                const targetNode = currentNodeMap[edge.target];
                console.log(' targetNode',targetNode)
                if (!sourceNode || !targetNode)
                    console.warn('source or target is not defined!!!', edge, sourceNode, targetNode);

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
            // edges.forEach((edge) => {
            //     // set edges' style
            //     const targetNode = currentNodeMap[edge.target];

            //     const size = ((edge.count - minCount) / countRange) * edgeSizeRange + minEdgeSize || 1;
            //     edge.size = size;

            //     const arrowWidth = Math.max(size / 2 + 2, 3);
            //     const arrowLength = 10;
            //     const arrowBeging = targetNode.size + arrowLength;
            //     let arrowPath = `M ${arrowBeging},0 L ${arrowBeging + arrowLength},-${arrowWidth} L ${
            //         arrowBeging + arrowLength
            //         },${arrowWidth} Z`;
            //     let d = targetNode.size / 2 + arrowLength;
            //     if (edge.source === edge.target) {
            //         edge.type = 'loop';
            //         arrowPath = undefined;
            //     }
            //     const sourceNode = currentNodeMap[edge.source];
            //     const isRealEdge = targetNode.isReal && sourceNode.isReal;
            //     edge.isReal = isRealEdge;
            //     const stroke = isRealEdge ? global.edge.style.realEdgeStroke : global.edge.style.stroke;
            //     const opacity = isRealEdge
            //         ? global.edge.style.realEdgeOpacity
            //         : global.edge.style.strokeOpacity;
            //     const dash = Math.max(size, 2);
            //     const lineDash = isRealEdge ? undefined : [dash, dash];
            //     edge.style = {
            //         stroke,
            //         strokeOpacity: opacity,
            //         cursor: 'pointer',
            //         lineAppendWidth: Math.max(edge.size || 5, 5),
            //         fillOpacity: 1,
            //         lineDash,
            //         endArrow: arrowPath
            //             ? {
            //                 path: arrowPath,
            //                 d,
            //                 fill: stroke,
            //                 strokeOpacity: 0,
            //             }
            //             : false,
            //     };
            //     edge.labelCfg = {
            //         autoRotate: true,
            //         style: {
            //             stroke: global.edge.labelCfg.style.stroke,
            //             fill: global.edge.labelCfg.style.fill,
            //             lineWidth: 4,
            //             fontSize: 12,
            //             lineAppendWidth: 10,
            //             opacity: 1,
            //         },
            //     };
            //     if (!edge.oriLabel) edge.oriLabel = edge.label;
            //     // if (largeGraphMode || !edgeLabelVisible) edge.label = '';
            //     else {
            //         edge.label = labelFormatter(edge.label, labelMaxLength);
            //     }

            //     // arrange the other nodes around the hub
            //     const sourceDis = sourceNode.size / 2 + 20;
            //     const targetDis = targetNode.size / 2 + 20;
            //     if (sourceNode.x && !targetNode.x) {
            //         targetNode.x = sourceNode.x + sourceDis * Math.cos(Math.random() * Math.PI * 2);
            //     }
            //     if (sourceNode.y && !targetNode.y) {
            //         targetNode.y = sourceNode.y + sourceDis * Math.sin(Math.random() * Math.PI * 2);
            //     }
            //     if (targetNode.x && !sourceNode.x) {
            //         sourceNode.x = targetNode.x + targetDis * Math.cos(Math.random() * Math.PI * 2);
            //     }
            //     if (targetNode.y && !sourceNode.y) {
            //         sourceNode.y = targetNode.y + targetDis * Math.sin(Math.random() * Math.PI * 2);
            //     }

            //     if (!sourceNode.x && !sourceNode.y && manipulatePosition) {
            //         sourceNode.x = manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
            //         sourceNode.y = manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
            //     }
            //     if (!targetNode.x && !targetNode.y && manipulatePosition) {
            //         targetNode.x = manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
            //         targetNode.y = manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
            //     }
            // });

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
                const node = e.item;
                const states = node.getStates();
                let clicked = false;
                const model = node.getModel();
                let size = 200;
                let labelText = 'NODE: ' + model.id + '\n' + model.description;
                states.forEach(function (state) {
                    if (state === 'click') {
                        clicked = true;
                        size = model.oriSize;
                        labelText = model.oriLabel;
                    }
                });
                graph.setItemState(node, 'click', !clicked);
                graph.updateItem(node, {
                    size,
                    label: labelText,
                });
                graph.layout();
            });

            graph.data(data);
            graph.render();
        }

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

                // dataRange[0]:10
                // outLength:20
                // dataLength:0
                // outRange[0]:10
                n[propName] = ((n[refPropName] - 10) * outLength) / 1 + outRange[0];
            }
        });
    }
    return (
        <>
            <div
                ref={container}
                style={{ backgroundColor: '#2b2f33', height: 'calc(100vh - 100px)', width: '70%' }}
            />
        </>
    )
}
export default DeviceGraph



