import React from 'react';
import { HomeOutlined,AppstoreOutlined,DashboardOutlined } from '@ant-design/icons';
// import Home from '../pages/home'
// import History from '../pages/history'
// import Allocation from '../pages/allocation'
// import Error404 from '../pages/errpage'
// import Login from '../pages/login'
const Home = React.lazy(() => import('../pages/home'));
const History = React.lazy(() => import('../pages/history'));
const Allocation = React.lazy(() => import('../pages/allocation'));
const Error404  = React.lazy(() => import('../pages/errpage'));
const Login  = React.lazy(() => import('../pages/login'));


export const router =[
    {
        id:1,
        icon:<HomeOutlined />,
        title:'首页',
        exact:true,
        path:'/time/dashboard',
        component:<Home/>,
    },
    {
        id:2,
        icon:<AppstoreOutlined />,
        title:'产品视图',
        exact:false,
        path:'/time/product',
        component:<History/>,
    },
    {
        id:3,
        title:'产品维护',
        icon:<DashboardOutlined />,
        exact:false,
        path:'/time/allocation',
        component:<Allocation/>,
    },
 
  
]
export const UnAuthRouter=[  
    {
        id:4,
        title:'登录',
        exact:false,
        path:'/login',
        component:<Login/>,
    },
    {
        id:5,
        title:'404',
        exact:false,
        path:'*',
        component:<Error404/>,
    },
]

