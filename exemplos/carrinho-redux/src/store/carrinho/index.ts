import {CarrinhoState, CarrinhoTypes} from "./types";
import {Reducer} from "redux";

const INITIAL_STATE: CarrinhoState = {
    produtos: []
}

const reducer: Reducer<CarrinhoState> = (state = INITIAL_STATE, action) => {
    let produtos = state.produtos.slice();
    switch (action.type) {
        case CarrinhoTypes.ADD_TO_CART:
            produtos.push(action.payload);
            return {
                produtos
            };
        case CarrinhoTypes.REMOVE_FROM_CART:
            produtos = state.produtos.slice();
            produtos.splice(produtos.findIndex(p => p.id === action.payload.id), 1);
            return {
                produtos
            }
        default:
            return state;
    }
}

export default reducer;


