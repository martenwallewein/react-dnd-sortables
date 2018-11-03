import * as React from "react";

interface Props {
    title: string;
}

const style = {
    width: 100,
    height: 50,
    border: "1px solid black",
    borderRadius: "8px",
    padding: "0.5em",
    overflow: "hidden"
};

class Card extends React.Component<Props> {
    render() {
        return (
            <div style={style}>
                {this.props.title}
            </div>
        );
    }
}

export default Card;