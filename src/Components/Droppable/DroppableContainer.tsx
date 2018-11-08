import * as React from "react";
import {DropTarget, ConnectDropTarget, DropTargetMonitor} from "react-dnd";
import ItemTypes from "../Draggable/ItemTypes";
import update from "immutability-helper";
import IDraggableItemIdentifier from "../Draggable/IDraggableItemIdentifier";
import {IDraggableInfo} from "../../Types/IDraggableInfo";
import {IDroppableInfo} from "../../Types/IDroppableInfo";
import {ReactNode} from "react";
// import DraggableItem from "../Draggable/DraggableItem";
import WithSortableContext from "../Context/WithSortableContext";
// import update from "immutability-helper";

export type OnChildDropped = (draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => void;

const dropTarget = {
    drop(props: DroppableContainerProps, monitor: DropTargetMonitor, component: DroppableContainer) {
        const droppedItem: IDraggableItemIdentifier = monitor.getItem();
        const targetIndex = component.state.draggableChildren.findIndex(child => droppedItem.id === child.id);

        const draggableInfo: IDraggableInfo = {
            id: droppedItem.id,
            sourceIndex: droppedItem.sourceIndex
        };

        const droppableInfo: IDroppableInfo = {
            id: props.id,
            targetIndex
        };

        props.context.removePlaceholders();

        component.stopDragging();
        props.onChildDropped(draggableInfo, droppableInfo);
        // component.removePlaceholders();
        // props.onChildDropped(component.state.cards);
    },
};

export interface DraggableItemDimension {
    width?: number;
    height?: number;
}

export interface DroppableContainerProps {
    onChildDropped: OnChildDropped;
    connectDropTarget?: ConnectDropTarget;
    id: string;
    style?: object;
    className?: string;
    children?: ReactNode;
    draggableItemDimension?: DraggableItemDimension;
    context?: any;
}

interface State {
    draggableChildren: IDraggableItemIdentifier[];
    isDraggingOver: boolean;
}

@DropTarget(ItemTypes.CARD, dropTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))

class DroppableContainer extends React.Component<DroppableContainerProps, State> {
    constructor(props: DroppableContainerProps) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);
        this.state = {
            draggableChildren: DroppableContainer.reactChildrenToItemIdentifiers(props.children, props.id),
            isDraggingOver: false
        };
    }

    componentDidMount() {
        this.props.context.registerDroppable(this);
    }

    stopDragging() {
        this.setState({
            isDraggingOver: false
        });
    }

    static getDerivedStateFromProps(nextProps: DroppableContainerProps, prevState: State) {

        if (prevState.isDraggingOver)
            return {};

        // console.log("getDerivedStateFromProps");

        return {
            draggableChildren: DroppableContainer.reactChildrenToItemIdentifiers(nextProps.children, nextProps.id)
        };
    }

    static reactChildrenToItemIdentifiers(children: ReactNode, droppableId: string): IDraggableItemIdentifier[] {

        return React.Children.map(children, (child: any, index: number) => {

            return {
                id: child.props.id,
                sourceIndex: index,
                droppableId,
                isDraggableItem: child.__proto__.isDraggableItem
            };
        });
    }

    public removePlaceholders(setToFalse?: boolean) {
        let draggableChildren = this.state.draggableChildren;

        draggableChildren = draggableChildren.map(child => {
             if (setToFalse && child.placeholder)
                child.placeholder = false;

            if (child.droppableId !== this.props.id)
                return null;

            return child;
        });

        draggableChildren = draggableChildren.filter(child => child !== null);

        this.setState({
            draggableChildren
        });
    }

    public render() {
        const {connectDropTarget, children, style, className} = this.props;
        const {draggableChildren} = this.state;
        // console.log(this.state.draggableChildren);
        // console.log("render");
        // console.log(cards);
        const childArray = React.Children.toArray(children);
        return (
            connectDropTarget &&
            connectDropTarget(
                <div style={style} className={className}>
                    {
                        draggableChildren.map((draggableChild: IDraggableItemIdentifier, index: number) => {

                            if (draggableChild === null)
                                return;

                            let reactChild: any = childArray.find((child: any) => child.props.id === draggableChild.id);
                            if (!reactChild) {
                                reactChild = this.props.context.draggables.find((child: any) => child.props.id === draggableChild.id);
                                return React.createElement(reactChild.__proto__.constructor, {
                                        ...reactChild.props,
                                        placeholder: draggableChild.placeholder,
                                        moveCard: this.moveCard,
                                        findCard: this.findCard
                                    },
                                    reactChild.props.children
                                );
                                // const dimensions: DraggableItemDimension = this.props.draggableItemDimension;
                                // return <DraggableItem id={draggableChild.id} placeholder={true} style={dimensions}/>;
                            }

                            return React.createElement(reactChild.type, {
                                    ...reactChild.props,
                                    placeholder: draggableChild.placeholder,
                                    moveCard: this.moveCard,
                                    findCard: this.findCard,
                                    droppableId: this.props.id
                                },
                                reactChild.props.children
                            );
                        })
                    }
                </div>
            )
        );
    }

    private moveCard(id: string, atIndex: number) {
        // let {card} = this.findCardInternal(id);
        // console.log("move card " + id + " in list " + this.props.id + " at index " + atIndex);
        // console.log(card);

        // const exisitingCard = this.state.draggableChildren[atIndex];
        // console.log(exisitingCard);

        this.props.context.setCurrentDroppable(this);

        if (!this.state.draggableChildren.find(card2 => card2.id === id)) {
            const cards = this.state.draggableChildren;
            const card = this.props.context.draggables.find((drag: any) => drag.props.id === id);
            cards.splice(atIndex, 0, {
                id: id,
                placeholder: true,
                droppableId: card.props.droppableId
            });
            // console.log("inserted card");
            this.setState({
                draggableChildren: cards,
                isDraggingOver: true
            });

            return;
        }

        const index = this.state.draggableChildren.findIndex(card2 => id === card2.id);
        const card = this.state.draggableChildren[index];
        card.placeholder = true;
        // console.log(card);
        if (index === atIndex)
            return;

        this.setState({
            isDraggingOver: true
        });

        this.setState(
            update(this.state, {
                draggableChildren: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }),
        );
    }

    private findCard(id: string) {
        // console.log("find card " + id + " in list " + this.props.prefix);
        const card = this.state.draggableChildren.filter(c => c.id === id)[0];

        return {
            card,
            index: this.state.draggableChildren.indexOf(card),
        };
    }

    /*private findCardInternal(id: string) {
        console.log("find card " + id + " in list " + this.props.prefix);
        const card = this.props.cards.filter(c => c.id === id)[0];

        return {
            card,
            index: this.props.cards.indexOf(card),
        };
    }*/
}

export default WithSortableContext(DroppableContainer);
