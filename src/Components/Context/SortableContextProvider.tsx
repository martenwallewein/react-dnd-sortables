import * as React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

interface Props {

}

interface State {
    isDragging: boolean;
    draggables: any[];
    droppables: any[];
    currentDroppable: any;
}

// type RegisterDraggable = (item: DraggableItem) => void;

export interface ISortableContext {
    isDragging: boolean;
    registerDraggable: Function;
    registerDroppable: Function;
    draggables: any[];
    droppables: any[];
    currentDroppable: any;
    removePlaceholders: Function;
}

const SortableContext = React.createContext({
    isDragging: false,
    draggables: [],
    droppables: [],
    currentDroppable: null,
    setState: (newState: any) => {
    },
    registerDraggable: () => {
    },
    registerDroppable: () => {
    },
    setCurrentDroppable: (a: any) => {

    },
    removePlaceholders: () => {
    },
});

@DragDropContext(HTML5Backend)
class SortableContextProvider extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isDragging: false,
            draggables: [],
            droppables: [],
            currentDroppable: null
        };
    }

    setInternalState(newState: any) {
        this.setState(newState);
    }

    setCurrentDroppable(droppable: any) {

        this.state.droppables.forEach(droppable2 => {
            if (droppable.props.id === droppable2.props.id)
                return;

            droppable2.removePlaceholders();
        });
        this.setState({
            currentDroppable: droppable
        });
    }

    removePlaceholders() {
        for (let i = 0; i < this.state.droppables.length; ++i) {
            this.state.droppables[i].removePlaceholders(true);
        }
    }

    registerDraggable(draggable: any) {
        const draggables = this.state.draggables;
        if (draggables.find(drag => drag.props.id === draggable.props.id))
            return;

        draggables.push(draggable);
        console.log("registered draggable");
        console.log(draggables);
        this.setState({
            draggables
        });
    }

    registerDroppable(droppable: any) {
        const droppables = this.state.droppables;
        if (droppables.find(drop => drop.props.id === droppable.props.id))
            return;

        droppables.push(droppable);
        console.log("registered droppable");
        console.log(droppable);
        this.setState({
            droppables
        });
    }

    render() {
        return (
            <SortableContext.Provider
                value={{
                    ...this.state,
                    setState: this.setInternalState.bind(this),
                    registerDraggable: this.registerDraggable.bind(this),
                    registerDroppable: this.registerDroppable.bind(this),
                    setCurrentDroppable: this.setCurrentDroppable.bind(this),
                    removePlaceholders: this.removePlaceholders.bind(this)
                }}
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
