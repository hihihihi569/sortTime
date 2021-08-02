import React, { Component, useEffect } from 'react';
import G6 from '@antv/g6';
import { Button } from 'antd';

const treeData = {
    id: 'root',
    label: 'Root',
    children: [
        {
            id: 'SubTreeNode1',
            label: 'subroot1',
            children: [
                {
                    id: 'SubTreeNode1.1',
                    label: 'subroot1.1',
                }
            ]
        },
        {
            id: 'SubTreeNode2',
            label: 'subroot2',
            children: [
                {
                    id: 'SubTreeNode2.1',
                    label: 'subroot2.1',
                },
                {
                    id: 'SubTreeNode2.2',
                    label: 'subroot2.2',
                }
            ]
        }
    ]
};

const TreeGraphReact = () => {
    const ref = React.useRef(null)	// 给 ref 设置一个any类型解决 container 报错
    let graph = null		// 给 graph 设置一个any类型 解决 new G6.Graph 时赋值问题

    useEffect(() => {
        if (!graph) {

            graph = new G6.TreeGraph({
                container: ref.current,   // 指定挂载容器
                width: 800,   // 图的宽度
                height: 500,    // 图的高度
                fitView: true,  // 是否将图适配到画布大小，可以防止超出画布或留白太多。
                modes: {
                    default: ['drag-canvas']
                },
                defaultEdge: {
                    shape: 'cubic-horizontal',
                    style: {
                        stroke: '#A3B1BF'
                    }
                },
                defaultNode: {
                    shape: 'rect',
                    labelCfg: {
                        style: {
                            fill: '#000000A6',
                            fontSize: 10
                        }
                    },
                    style: {
                        stroke: '#72CC4A',
                        width: 150
                    }
                },
                layout: {
                    type: 'dendrogram', // 布局类型
                    direction: 'TB',    // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
                    nodeSep: 50,      // 节点之间间距
                    rankSep: 200      // 每个层级之间的间距
                }
            })
        }
        graph.data(treeData)	// 加载数据
        graph.render()	// 渲染
    }, [])

    const handleChangeData = () => {
        const node = graph.findById('SubTreeNode1')
        graph.updateItem(node, {
            label: 'xxx',
            style: {
                fill: 'red'
            }
        })
    }


    return (
        <div ref={ref}>
            <Button onClick={handleChangeData} type='primary'>更新数据源</Button>
        </div>
    )
}

export default TreeGraphReact
