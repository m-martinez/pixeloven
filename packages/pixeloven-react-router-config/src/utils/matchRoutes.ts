import { match, matchPath } from "react-router";
import { RouteProps } from "../types";

interface MatchedRoutes {
    matched: match;
    route: RouteProps;
}

/**
 * Copied form Router.computeRootMatch(pathname) version 4.4.0-beta
 * Type definitions don't cover this and not available in the version of react router we use
 * @param pathname
 *
 * @todo Scope whether root match might need to be whatever public path instead of always "/"
 * @todo Should we handle setting statusCode here if possible
 * @todo Should have a setting to act like a <switch> so that it only matches the first?
 *
 * @todo If a server knows a statusCode ahead of time (like failed api response) we should be able to do matching on both status and path
 */
export const computeRootMatch = (pathname: string): match => {
    return {
        isExact: pathname === "/",
        params: {},
        path: "/",
        url: "/",
    };
};

const matchRoutes = (
    routes: RouteProps[],
    pathname: string,
    matches: MatchedRoutes[] = [],
) => {
    routes.forEach(route => {
        const matched = route.path
            ? matchPath(pathname, route)
            : matches.length
            ? matches[matches.length - 1].matched // use parent match
            : computeRootMatch(pathname); // use default "root" match
        if (matched) {
            matches.push({ route, matched });
            if (route.routes) {
                matchRoutes(route.routes, pathname, matches);
            }
        }
        return matched;
    });
    return matches;
};

export default matchRoutes;
