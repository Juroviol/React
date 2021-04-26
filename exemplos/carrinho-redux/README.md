# Carrinho com Redux

Este é um pequeno exemplo de aplicacão que utiliza React em Typescript com Redux. Foi elaborado com propósito de praticar os conceitos de:

- Store
- Action
- Reducer

Esta aplicação renderiza em sua única página uma listagem de produtos, no componente `Loja`, com botões de adicionar 
e remover o produto no carrinho. E um carrinho de compras que exibe os produtos adicionados, no componente `Carrinho`.
A ideia é que ao clicar nos botões do componente `Loja`, ações sejam disparadas ao Redux para que ele atualize 
automaticamente o componente `Carrinho`. Sendo assim não tendo nenhuma comunicação direta entre os dois componentes
através de props.

Para rodar:

```
npm install
npm start
```