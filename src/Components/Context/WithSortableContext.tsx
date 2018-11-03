import * as React from "react";
import {SortableContext} from "./SortableContextProvider";

function WithSortableContext<C extends React.ComponentClass>(Component: C): (props: any) => JSX.Element {
    const SortableContextConsumer: React.SFC<{}> = props => {
        return (
            <SortableContext.Consumer>
                {(context) => {
                    // @ts-ignore
                    return <Component {...props} context={context}/>;
                }}

            </SortableContext.Consumer>
        );
    };

    return SortableContextConsumer;
}

export default WithSortableContext;
