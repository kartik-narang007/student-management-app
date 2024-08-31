import React from "react";

const withHeader = (WrappedComponent) => {
    return (props) => {
        return (
            <header className="flex items-start w-full px-4 py-[1.88rem] border-y border-yellow-400 justify-between">
                <div className="flex items-center justify-center">
                    <WrappedComponent {...props}>
                        {props.children[0]}
                    </WrappedComponent>
                </div>
                <div className="flex items-center justify-center">
                    <WrappedComponent {...props}>
                        {props.children[1]}
                    </WrappedComponent>
                </div>
            </header>
        );
    };
};

export default withHeader;
