import React from 'react';
import {Provider} from "react-redux";
import Carrinho from "./components/carrinho/Carrinho";
import Loja from "./components/loja/Loja";
import store from "./store";

function App() {
  return (
      <Provider store={store}>
        <Carrinho/>
        <Loja/>
      </Provider>
  );
}

export default App;
