import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from "./Carrinho.module.css";
import {ApplicationState} from "../../store";
import {Produto} from "../../store/carrinho/types";

interface StateProps {
    produtos: Produto[]
}

type Props = StateProps

class Carrinho extends Component<Props> {

    render() {
        const produtos = this.props.produtos.map((produto: any) => (
            <li key={produto.id}>{produto.descricao}</li>
        ));
        return (
            <ul className={styles.carrinho}>
                {produtos.length ? produtos : <span>Não há produtos no carrinho.</span>}
            </ul>
        );
    }

}

const mapStateToProps = (state: ApplicationState) => {
    console.log(state);
    return {
        produtos: state.carrinho.produtos
    }
}

export default connect(mapStateToProps)(Carrinho);