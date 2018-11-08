import DroppableContainer from "../src/Components/Droppable/DroppableContainer";
import * as React from "react";
import DraggableItem from "../src/Components/Draggable/DraggableItem";
import {IDraggableInfo} from "../src/Types/IDraggableInfo";
import {IDroppableInfo} from "../src/Types/IDroppableInfo";
import Card from "./Components/Card";
import {SortableContextProvider} from "../src/Components/Context/SortableContextProvider";

const styles = {
    AppContainer: {
        display: "flex",
        flexFlow: "row"
    },
    Container: {
        marginLeft: "1em",
        display: "flex",
        flexFlow: "column",
    },
    HorizontalContainer: {
        display: "flex",
        flexFlow: "row",

    },
    Card: {
        margin: "0.25em",
        backgroundColor: "#9c27b0"
    },
    Card2: {
        margin: "0.25em",
        backgroundColor: "#2196f3"
    }
};
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

const cards2 = [
    {
        id: 30,
        text: "3Spam in Twitter and IRC to promote it",
        type: "3"
    },
    {
        id: 31,
        text: "3???",
        type: "3"
    },
    {
        id: 32,
        text: "3PROFIT",
        type: "3"
    }
];

interface Props {

}

interface State {
    cards: any[];
    cards2: any[];
}


class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            cards: cards,
            cards2: cards2
        };
    }

    render() {
        return (
            <SortableContextProvider>
                <div style={styles.AppContainer}>
                    <DroppableContainer
                        style={styles.Container}
                        id={"1"}
                        onChildDropped={(draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => {
                            this.setState({
                                cards2: cards2,
                                cards: cards
                            });
                        }}
                        draggableItemDimension={{
                            height: 50
                        }}
                    >
                        {
                            this.state.cards.filter(card => card.type === "1").map(card => {
                                return (
                                    <DraggableItem id={card.id.toString()}>
                                        <Card title={card.text} style={styles.Card}/>
                                    </DraggableItem>
                                );
                            })
                        }
                    </DroppableContainer>
                    <br/>
                    <DroppableContainer
                        style={styles.Container}
                        id={"2"}
                        onChildDropped={(draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => {
                            this.setState({
                                cards2: cards2,
                                cards: cards
                            });
                            /*const otherCards = cards.filter(card => card.type === "1");
                            compCards = compCards.map((card: any) => {
                                card.type = "2";
                                return card;
                            });

                            const newCards = [...otherCards, ...compCards, ];
                            this.setState({
                                cards: newCards
                            });*/
                        }}
                    >
                        <DroppableContainer
                            id={"3"}
                            onChildDropped={(draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => {
                                this.setState({
                                    cards2: cards2,
                                    cards: cards
                                });
                            }}
                            style={styles.HorizontalContainer}
                        >
                            {
                                this.state.cards2.map(card => {
                                    return (
                                        <DraggableItem id={card.id.toString()}>
                                            <Card title={card.text} style={styles.Card2}/>
                                        </DraggableItem>
                                    );
                                })
                            }
                        </DroppableContainer>
                        {
                            this.state.cards.filter(card => card.type === "2").map(card => {
                                return (
                                    <DraggableItem id={card.id.toString()}>
                                        <Card title={card.text} style={styles.Card}/>
                                    </DraggableItem>
                                );
                            })
                        }
                    </DroppableContainer>
                </div>
            </SortableContextProvider>
        );
    }
}

export default App;
