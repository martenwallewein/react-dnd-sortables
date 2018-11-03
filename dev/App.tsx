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
        marginLeft: "1em"
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
            <SortableContextProvider>
                <div style={styles.AppContainer}>
                    <DroppableContainer
                        style={styles.Container}
                        id={"1"}
                        onChildDropped={(draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => {}}
                        draggableItemDimension={{
                            height: 50
                        }}
                    >
                        {
                            cards.filter(card =>  card.type === "1").map(card => {
                                return (
                                    <DraggableItem id={card.id.toString()}>
                                        <Card title={card.text}/>
                                    </DraggableItem>
                                );
                            })
                        }
                    </DroppableContainer>
                    <br/>
                    <DroppableContainer
                        style={styles.Container}
                        id={"2"}
                        draggableItemDimension={{
                            height: 50
                        }}
                        onChildDropped={(draggableInfo: IDraggableInfo, droppableInfo: IDroppableInfo) => {

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
                        {
                            cards.filter(card =>  card.type === "2").map(card => {
                                return (
                                    <DraggableItem id={card.id.toString()}>
                                        <Card title={card.text}/>
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
