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

- Utiliza a sintaxe de classes do ES6 com herença da classe Component da biblioteca do React;
- Há controle de ciclo de vida através dos métodos `componentDidMount` e `componentDidUmnount`;
- Há controle de estado. Por isso também são chamados de componentes 'stateful';
- Há o método render e o JSX é retornado pelo mesmo;

### Passando dados para outro componente

#### Props

## JSX

```
const element = <h1>Hello, {this.props.name}</h1>;
```

Como podemos ver acima esta é uma sintaxe bem estranha para aqueles que estão familiarizados com JavaScript. Alguém desavisado poderia facilmente apontar que este código está com problemas e não iria rodar. Primeiramente o desavisado notaria que estamos atribuindo código HTML a uma constante do JavaScript e em seguida que a utilização das chaves no meio do HTML não faz sentido. 

JSX é uma extensão de sintaxe para JavaScript. JSX produz “elementos” do React.

Ao invés de separar tecnologias artificialmente colocando markup e lógica em arquivos separados, o React adota o fato de que a lógica de renderização é inerentemente acoplada com outras lógicas de UI: como eventos são manipulados, como o state muda com o tempo e como os dados são preparados para exibição.

