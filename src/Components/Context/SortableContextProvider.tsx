import * as React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
interface Props {

}

interface State {
    isDragging: boolean;
    draggables: any[];
    droppables: any[];
}

// type RegisterDraggable = (item: DraggableItem) => void;

export interface ISortableContext {
    isDragging: boolean,
    registerDraggable: Function;
    registerDroppable: Function;
    draggables: any[];
    droppables: any[];
}

const SortableContext = React.createContext({
    isDragging: false,
    draggables: [],
    droppables: [],
    setState: (newState: any) => {
    }
});

@DragDropContext(HTML5Backend)
class SortableContextProvider extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isDragging: false,
            draggables: [],
            droppables: [],
        };
    }

    setInternalState(newState: any) {
        this.setState(newState);
    }

    registerDraggable(draggable: any) {
        const draggables = this.state.draggables;
    }

    render() {
        return (
            <SortableContext.Provider
                value={{...this.state, setState: this.setInternalState.bind(this)}}
            >
                {this.props.children}
            </SortableContext.Provider>
        );
    }
}

export {
    SortableContextProvider,
    SortableContext
};
