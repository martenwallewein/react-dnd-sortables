import * as React from "react";
import {DropTarget, DragDropContext, ConnectDropTarget} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Card from "./DraggableItem";
import ItemTypes from "./ItemTypes";
import update from "immutability-helper";
// import update from "immutability-helper";

const style = {
    width: 400,
};

const cardTarget = {
    drop(props: ContainerProps, monitor: any, component: Container) {
        component.removePlaceholders();
        props.onChildDropped(component.state.cards);
    },
};

export interface ContainerProps {
    connectDropTarget?: ConnectDropTarget;
    prefix: string;
    cards: any[];
    cardsToRender: any[];
    onChildDropped: (cards: Card[]) => void;
}

export interface ContainerState {
    cards: any[];
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class Container extends React.Component<ContainerProps, ContainerState> {
    constructor(props: ContainerProps) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);
        this.state = {
            cards: props.cardsToRender
        };
    }

    public removePlaceholders() {
        let cards = this.state.cards;

        cards = cards.map(card => {
            if (card.placeholder)
                card.placeholder = false;

            return card;
        });

        this.setState({
            cards
        });
    }

    public render() {
        const {connectDropTarget} = this.props;
        const {cards} = this.state;
        console.log("render");
        console.log(cards);
        return (
            connectDropTarget &&
            connectDropTarget(
                <div style={style}>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            id={card.id}
                            text={card.text}
                            placeholder={card.placeholder}
                            moveCard={this.moveCard}
                            findCard={this.findCard}
                        />
                    ))}
                </div>,
            )
        );
    }

    private moveCard(id: string, atIndex: number) {
        let {card} = this.findCardInternal(id);
        console.log("move card " + id + " in list " + this.props.prefix + " at index " + atIndex);
        console.log(card);

        const exisitingCard = this.state.cards[atIndex];
        console.log(exisitingCard);
        console.log(this.state.cards);

        if (!this.state.cards.find(card2 => card2.id === card.id)) {
            const cards = this.state.cards;
            cards.splice(atIndex, 0, {
                id: card.id,
                text: card.text,
                placeholder: true
            });
            console.log("inserted card");
            this.setState({
                cards
            });

            return;
        }

        const index = this.state.cards.findIndex(card2 => card.id === card2.id);
        card = this.state.cards[index];
        if (index === atIndex)
            return;

        this.setState(
            update(this.state, {
                cards: {
                    $splice: [[index, 1], [atIndex, 0, card]],
                },
            }),
        );
    }

    private findCard(id: string) {
        console.log("find card " + id + " in list " + this.props.prefix);
        const card = this.state.cards.filter(c => c.id === id)[0];

        return {
            card,
            index: this.state.cards.indexOf(card),
        };
    }

    private findCardInternal(id: string) {
        console.log("find card " + id + " in list " + this.props.prefix);
        const card = this.props.cards.filter(c => c.id === id)[0];

        return {
            card,
            index: this.props.cards.indexOf(card),
        };
    }
}

