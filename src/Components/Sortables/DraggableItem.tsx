import * as React from "react";
import {
    DragSource,
    DropTarget,
    ConnectDragSource,
    ConnectDropTarget,
    DragSourceMonitor,
    DropTargetMonitor,
} from "react-dnd";

import ItemTypes from "./ItemTypes";

const style = {
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: ".5rem",
    backgroundColor: "white",
    cursor: "move",
};

const cardSource = {
    beginDrag(props: CardProps) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index,
        };
    },

    endDrag(props: CardProps, monitor: DragSourceMonitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveCard(droppedId, originalIndex);
        }
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },

    hover(props: CardProps, monitor: DropTargetMonitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    },
};

export interface CardProps {
    id: string;
    text: string;
    placeholder?: boolean;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
    moveCard: (id: string, to: number) => void;
    findCard: (id: string) => { index: number };
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
export default class Card extends React.Component<CardProps> {
    public render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
            placeholder
        } = this.props;
        const opacity = isDragging || placeholder ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
            )
        );
    }
}
