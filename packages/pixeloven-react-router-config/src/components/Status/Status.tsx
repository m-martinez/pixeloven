import * as React from "react";
import { StaticContext } from "react-router";

export interface StatusProps {
    children: React.ReactNode;
    statusCode?: number;
    staticContext?: StaticContext;
}

const Status = (props: StatusProps) => {
    const { children, statusCode, staticContext } = props;
    if (staticContext && statusCode) {
        staticContext.statusCode = statusCode;
    }
    return <React.Fragment>{children}</React.Fragment>;
};

export default Status;
