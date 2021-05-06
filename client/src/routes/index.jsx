import {
    Switch,
    Route,    
} from "react-router-dom";
import HomeRoute from "./home";
import VolumeRoute from "./volume";
import BrowseRoute from "./browse";
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const nestedRoutes = (basePath, routes) => 
    routes.map((r) => {
        r.path = basePath + r.path
        return r;
    });


const routePaths = [
    ...nestedRoutes("/", [
        {path: "", component: HomeRoute},
        ...nestedRoutes("browse", [
            {path: "", component: BrowseRoute},
            {path: "/volume", component: VolumeRoute}
        ]),        
    ]),
];

const RenderRoutes = (routes) => {
    console.log(routes);
    return (
        <TransitionGroup>
            <CSSTransition timeout={300}>
                <Switch>
                    {routes.routes.map((route, index) => {
                        return <Route key={index} exact {...route}/>;
                    })}
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export const Routes = () => {
    return (
        <>
            <RenderRoutes routes={routePaths}/>
        </>
    )
}