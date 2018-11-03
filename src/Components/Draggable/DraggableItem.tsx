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

const cardSource = {
    beginDrag(props: DraggableItemProps) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index,
        };
    },

    endDrag(props: DraggableItemProps, monitor: DragSourceMonitor) {
        const {id: droppedId, originalIndex} = monitor.getItem();
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

    hover(props: DraggableItemProps, monitor: DropTargetMonitor) {
        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props;

        if (draggedId !== overId) {
            const {index: overIndex} = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    },
};

export interface DraggableItemProps {
    id: string;
    style?: object;
    className?: string;
    dragStyle?: object;
    dragClassName?: string;
    dragChildren?: React.ReactElement<any>;

    placeholder?: boolean;
    connectDragSource?: ConnectDragSource;
    connectDropTarget?: ConnectDropTarget;
    isDragging?: boolean;
    moveCard?: (id: string, to: number) => void;
    findCard?: (id: string) => { index: number };
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))

class DraggableItem extends React.Component<DraggableItemProps> {
    public render() {
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
            placeholder,
            children,
            style,
            dragStyle,
            dragClassName,
            dragChildren,
            className
        } = this.props;

        const opacity = placeholder ? 0 : 1;
        const elementStyle = isDragging && dragStyle ? dragStyle : style;
        const elementClassName = isDragging && dragClassName ? dragClassName : className;
        const elementChildren = isDragging && dragChildren ? dragChildren : children;

        const returnElement = (
            <div
                style={{...elementStyle, opacity}}
                className={elementClassName}
            >
                {elementChildren}
            </div>
        );

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(returnElement),
            )
        );
    }
}

export default DraggableItem;
