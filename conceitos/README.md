 # Conceitos


## Componentes

Um componente representa parte da interface do usuario. Componentes são reutilizáveis e podem ser utilizados onde voce quiser. Há duas maneiras de se definir um componente: por função ou por classe.

### Por Função

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- Sintaxe simplificada;
- Não há controle de ciclo de vida, por exemplo saber quando o componente foi construído ou quando foi destruído;
- Não há controle de estado. Por isso também são chamados de componentes 'stateless';
- Não existe o metodo render e o JSX é retornado direto pelo função;


### Por Classe

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

- Há controle de ciclo de vida através dos métodos `componentDidMount` e `componentDidUmnount`;
- Há controle de estado. Por isso também são chamados de componentes 'stateful';
- Há o método render e o JSX é retornado pelo mesmo;
