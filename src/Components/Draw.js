import React from "react";
import Card from "./Card";
import api from '../repository'
import { Droppable } from "react-drag-and-drop";
import { getData } from '../store/action/cards'
import { connect } from 'react-redux';

class Draw extends React.Component {
  state = {
    dataColumns: [],
    dataCards: [],
    value: ""
  };

  componentDidMount() {
    getData();
  }

  sortCards = itemCol => {
    let arr = [];
    this.props.dataCards.map(item => {
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
    api.addCard({ columnId, title })
      .then(() => {
        getData();
      });
  };

  deleteCard = cardId => {
    api.deleteCard(cardId)
      .then(() => {
        getData();
      });
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
    this.props.dataCards.map(item => {
      if (item._id === cardId) {
        const title = item.title
        api.deleteCard(cardId)
        api.addCard({ columnId, title })
          .then(() => {
            getData();
          });
      }
    })
  };

  onCardSave = (id, title) => {
    api.updateCard(id, { title })
      .then(() => {
        api.getData().then(([columns, cards]) => {
          this.setState({
            dataCards: cards
          })
        })
      });
  };

  render() {
    return (
      <>
        <div className="box">
          {this.props.dataColumns.map(itemCol => (
            <Droppable
              types={["data"]}
              onDrop={data => this.onDrop(data, itemCol)}
            >
              <div id={itemCol.id}>
                {itemCol.title}
                <button onClick={() => this.addCard(itemCol._id)}>+</button>
                {
                  this.sortCards(itemCol).map(item => (
                    < Card
                      item={item}
                      onClickInput={this.props.onClickInput}
                      onEscapePress={this.props.onEscapePress}
                      deleteCard={this.deleteCard}
                      dataCards={this.props.dataCards}
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
    dataColumns: state.cards.dataColumns,
    dataCards: state.cards.dataCards
  }
}

export default connect(mapStateToProps)(Draw)