import Container from "../src/Components/Sortables/DroppableContainer";
import * as React from "react";
import Card from "../src/Components/Sortables/DraggableItem";

const cards = [
    {
        id: 11,
        text: "1Write a cool JS library",
        type: "1"
    },
    {
        id: 12,
        text: "1Make it generic enough",
        type: "1"
    },
    {
        id: 13,
        text: "1Write README",
        type: "1"
    },
    {
        id: 14,
        text: "1Create some examples",
        type: "1"
    },
    {
        id: 15,
        text: "1Spam in Twitter and IRC to promote it",
        type: "1"
    },
    {
        id: 16,
        text: "1???",
        type: "1"
    },
    {
        id: 17,
        text: "1PROFIT",
        type: "1"
    },
    {
        id: 21,
        text: "2Write a cool JS library",
        type: "2"
    },
    {
        id: 22,
        text: "2Make it generic enough",
        type: "2"
    },
    {
        id: 23,
        text: "2Write README",
        type: "2"
    },
    {
        id: 24,
        text: "2Create some examples",
        type: "2"
    },
    {
        id: 25,
        text: "2Spam in Twitter and IRC to promote it",
        type: "2"
    },
    {
        id: 26,
        text: "2???",
        type: "2"
    },
    {
        id: 27,
        text: "2PROFIT",
        type: "2"
    }
];

interface Props {

}

interface State {
    cards: any[];
}

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            cards: cards
        };
    }

    render() {
        return (
            <React.Fragment>
                <Container
                    prefix={"1"}
                    cards={cards}
                    cardsToRender={cards.filter(card => card.id < 20)}
                    onChildDropped={(compCards: Card[]) => {
                        const otherCards = cards.filter(card => card.type === "2");
                        compCards = compCards.map((card: any) => {
                            card.type = "1";
                            return card;
                        });

                        const newCards = [...compCards, ...otherCards];
                        this.setState({
                            cards: newCards
                        });
                    }}
                />
                <br/>
                <Container
                    prefix={"2"}
                    cards={cards}
                    cardsToRender={cards.filter(card => card.id > 20)}
                    onChildDropped={(compCards: Card[]) => {
                        const otherCards = cards.filter(card => card.type === "1");
                        compCards = compCards.map((card: any) => {
                            card.type = "2";
                            return card;
                        });

                        const newCards = [...otherCards, ...compCards, ];
                        this.setState({
                            cards: newCards
                        });
                    }}
                />
            </React.Fragment>
        );
    }
}

export default App;
