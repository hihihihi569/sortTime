import React, { Component, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import { router, UnAuthRouter } from '../../router/index'
import LayoutTar from '../layout/layout'
export default class View extends Component {
    generateRouter = (routerList) => {
        return (
            routerList.map(res => {
                if (routerList.children) {
                    return (this.generateRouter(res.children))
                }
                else {
                    return (<Route key={res.id} exact={res.exact} path={res.path}>{res.component}</Route>)
                }
            }))

    }
    render() {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <Switch>
                        <Route path={'/'} exact>
                            <Redirect to={'/time/dashboard'}></Redirect>
                        </Route>
                        <Route path="/time">
                            <LayoutTar>

                                <Suspense fallback={<div>Loading...</div>}>
                                    {
                                        this.generateRouter(router)
                                    }
                                </Suspense>
                            </LayoutTar>
                        </Route>
                        <Switch>
                            {
                                UnAuthRouter.map((res) => {
                                    return <Route key={res.id} exact={res.exact} path={res.path}>{res.component}</Route>
                                })
                            }
                        </Switch>
                    </Switch>
                </Router>
            </Suspense>
        )
    }
}
