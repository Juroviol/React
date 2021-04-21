 # Conceitos


## Componentes

Um componente representa parte da interface do usuario. Componentes são reutilizáveis e podem ser utilizados onde voce quiser. Há duas maneiras de se definir um componente: por função ou por classe.

### Por Função

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```


### Por Classe

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
