import React from "react";
import { Draggable } from "react-drag-and-drop";

export default class Card extends React.Component {
  state = {
    value: "",
    initionalValue: "",
    id: null
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ initionalValue: item.title, value: item.title })
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  onKeyDown = event => {
    if (event.key === "Enter") {
      this.props.onSave(this.props.item._id, this.state.value, this.props.item.columnId)
      event.target.blur();
      this.setState({
        value: event.target.value
      });
    }
    if (event.key === "Escape") {
      this.setState({
        value: this.state.initionalValue
      });
      event.target.blur();
    }
  };

  onBlur = () => {
    this.setState({
      value: this.state.initionalValue
    });
    this.props.onEscapePress();
  }

  render() {
    return (
      <Draggable type="data" data={this.props.item._id}>
        <div className="card">
          <input
            value={this.state.value}
            onChange={this.onChange}
            onClick={this.props.onClickInput}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
          ></input>
          <button onClick={() => this.props.deleteCard(this.props.item._id)}>
            -
          </button>
        </div>
      </Draggable>
    );
  }
}