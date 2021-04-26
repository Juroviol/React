export enum CarrinhoTypes {
    ADD_TO_CART = '@carrinho/ADD_TO_CART',
    REMOVE_FROM_CART = '@carrinho/REMOVE_FROM_CART'
}

export interface Produto {
    id: number
    descricao: string
    preco: number
}

export interface CarrinhoState {
    readonly produtos: Produto[]
}