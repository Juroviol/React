import {createStore, Store} from "redux";
import rootReducer from "./rootReducer";
import {CarrinhoState} from "./carrinho/types";

export interface ApplicationState {
    carrinho: CarrinhoState
}

const store: Store<ApplicationState> = createStore(rootReducer);

export default store;