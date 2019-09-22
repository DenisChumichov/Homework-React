import React from "react";
import Draw from "./Components/Draw";
import './App.css';
import { Provider } from 'react-redux'
import store from './store/store'

class App extends React.Component {
  state = {
    value: ""
  };

  onClickInput = () => {
    this.setState({
      value:
        "Для сохранения изменений нажмите Enter. Для отмены изменений нажмите Esc."
    });
  };

  onEscapePress = () => {
    this.setState({ value: "" });
  };

  render() {
    return (
      <Provider store={store}>
        <div className="notifications" id="notifications">
          {this.state.value}
        </div>
        <Draw
          onClickInput={this.onClickInput}
          onEscapePress={this.onEscapePress}
        />
      </Provider>
    );
  }
}
export default App;
