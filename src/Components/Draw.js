import React from "react";
import Card from "./Card";
import { Droppable } from "react-drag-and-drop";
import { getData, addCard, deleteCard, updateCard } from '../store/action/cards'
import { connect } from 'react-redux';

class Draw extends React.Component {
  state = {
    columns: [],
    cards: [],
    value: "",
    isFocused: false
  };

  componentDidMount() {
    this.props.getData();
  }

  sortCards = itemCol => {
    let arr = [];
    this.props.cards.map(item => {
      if (item.columnId === itemCol._id) {
        arr.push(item);
      }
    });
    return arr;
  };

  addCard = columnId => {
    let title = prompt();
    if (!title) {
      alert("введите коректное значение");
      return false;
    }
    this.props.addCard({ columnId, title })
  };

  deleteCard = cardId => {
    this.props.deleteCard(cardId)
  };

  changeContent = event => {
    console.log(
      "Для сохранения изменений нажмите Enter. Для отмены изменений нажмите Esc."
    );
  };

  onChange = event => {
    this.setState({ value: event.target.value });
  };

  thisStateValue = itemtitle => {
    this.setState({ value: itemtitle });
    return this.state.value;
  };

  onDrop = (data, target) => {
    const cardId = data.data;
    const columnId = target._id
    this.props.cards.map(item => {
      if (item._id === cardId) {
        this.props.updateCard(cardId, { columnId: columnId, title: item.title })
      }
    })
  };

  onCardSave = (id, data, columnId) => {
    this.props.updateCard(id, { columnId: columnId, title: data })
  };

  onClickInput = () => {
    this.setState({
      isFocused: true
    });
  };

  onEscapePress = () => {
    this.setState({ isFocused: false });
  };

  render() {
    return (
      <>
        <div className="notifications" id="notifications">
          {this.state.isFocused && "Для сохранения изменений нажмите Enter. Для отмены изменений нажмите Esc."}
        </div>
        <div className="box">
          {this.props.columns.map(itemCol => (
            <Droppable
              types={["data"]}
              onDrop={data => this.onDrop(data, itemCol)}
            >
              <div id={itemCol.id}>
                {itemCol.title}
                <button onClick={() => this.addCard(itemCol._id)}>+</button>
                {this.sortCards(itemCol).map(item => (
                  < Card
                    item={item}
                    onClickInput={this.onClickInput}
                    onEscapePress={this.onEscapePress}
                    deleteCard={this.deleteCard}
                    onSave={this.onCardSave}
                  />
                ))}
              </div>
            </Droppable>
          ))}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    columns: state.cards.columns,
    cards: state.cards.cards
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    getData: () => { dispatch(getData()) },
    addCard: (data) => { addCard(data)(dispatch) },
    deleteCard: (data) => { deleteCard(data)(dispatch) },
    updateCard: (id, { columnId, title }) => { updateCard(id, { columnId, title })(dispatch) }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Draw)