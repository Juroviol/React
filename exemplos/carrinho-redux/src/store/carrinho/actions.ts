import { action } from "typesafe-actions";
import {CarrinhoTypes, Produto} from "./types";

export const addToCart = (produto: Produto) => action(CarrinhoTypes.ADD_TO_CART, produto);
export const removeFromCart = (produto: Produto) => action(CarrinhoTypes.REMOVE_FROM_CART, produto);