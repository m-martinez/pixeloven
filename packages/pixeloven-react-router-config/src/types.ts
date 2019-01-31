import { ConnectedComponentClass } from "react-redux";
import {
    RouteComponentProps as DefaultRouteComponentProps,
    RouteProps as DefaultRouteProps,
} from "react-router-dom";

interface Params { 
    [key: string]: object | number | string 
};
/**
 * @todo Need to do a better job with the Function type
 */
/* tslint:disable ban-types */
export type RouteFetchDataFunction = (
    callback: Function,
    ownProps: Params,
) => void;
/* tslint:enable ban-types */
export type RouteComponent<T = {}> =
    | React.ComponentType<DefaultRouteComponentProps<T>>
    | ConnectedComponentClass<object, DefaultRouteComponentProps<T>>;

export interface RouteComponentProps<T = {}>
    extends DefaultRouteComponentProps<T> {
    routes?: RouteProps[];
}

export interface RouteProps extends DefaultRouteProps {
    key?: number;
    component: RouteComponent<Params>;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteProps[];
    statusCode?: number;
}

export type RouteResolvePath = (parentPath: string) => string;

export interface RouteConfig {
    component: RouteComponent<Params>;
    exact?: boolean;
    path?: RouteResolvePath;
    fetchData?: RouteFetchDataFunction;
    routes?: RouteConfig[];
    statusCode?: number;
}
