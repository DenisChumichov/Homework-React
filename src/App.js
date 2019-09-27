import React from "react";
import Draw from "./Components/Draw";
import './css/App.css';
import './css/box.css';
import './css/card.css';
import './css/notifications.css';
import { Provider } from 'react-redux'
import store from './store/store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Draw />
      </Provider>
    );
  }
}
export default App;
