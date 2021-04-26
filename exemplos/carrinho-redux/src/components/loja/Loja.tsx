import React, {Component} from 'react';
import {bindActionCreators, Dispatch} from "redux";
import styles from "./Loja.module.css";
import {connect} from "react-redux";
import {Produto} from "../../store/carrinho/types";
import * as CarrinhoActions from "../../store/carrinho/actions";

interface State {
    produtos: Produto[]
}


interface DispatchProps {
    addToCart(produto: Produto): void
    removeFromCart(produto: Produto): void
}

interface OwnProps {

}

type Props = DispatchProps & OwnProps;

class Loja extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            produtos: []
        }
    }

    componentDidMount() {
        this.setState({
            produtos: [{
                id: 1,
                descricao: `Produto 1`,
                preco: 10.99
            },{
                id: 2,
                descricao: `Produto 2`,
                preco: 99.99
            },{
                id: 3,
                descricao: `Produto 3`,
                preco: 29.90
            }]
        });
    }

    render() {
        return (
            <div className={styles.loja}>
                {this.state.produtos.map((produto: any) => {
                    return (
                        <div className={styles.produto} key={produto.id}>
                            <h3>{produto.descricao}</h3>
                            <button onClick={() => this.props.addToCart(produto)}>Adicionar</button>
                            <button onClick={() => this.props.removeFromCart(produto)}>Remover</button>
                        </div>
                    )
                })}
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(CarrinhoActions, dispatch);

export default connect(null, mapDispatchToProps)(Loja);