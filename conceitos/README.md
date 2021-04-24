# Conceitos

- [JSX](#jsx)
- [Componentes](#componentes)
    - [Função](#função)
    - [Classe](#classe)
    - [Comunicação entre componentes](#comunicação-entre-componentes)
        - [Passando informações do pai para o filho usando Props](#passando-informações-do-pai-para-o-filho-usando-props)
            - [Em Typescript](#em-typescript)
        - [Passando informações do filho pro pai usando Props](#passando-informações-do-filho-pro-pai-usando-props)
- [Children](#children)    

## JSX

```
const element = <h1>Hello, {this.props.name}</h1>;
```

Como podemos ver acima esta é uma sintaxe bem estranha para aqueles que estão familiarizados com JavaScript. Alguém desavisado poderia facilmente apontar que este código está com problemas e não iria rodar. Primeiramente o desavisado notaria que estamos atribuindo código HTML a uma constante do JavaScript e em seguida que a utilização das chaves no meio do HTML não faz sentido.

JSX é uma extensão de sintaxe para JavaScript. JSX produz “elementos” do React.

Ao invés de separar tecnologias artificialmente colocando markup e lógica em arquivos separados, o React adota o fato de que a lógica de renderização é inerentemente acoplada com outras lógicas de UI: como eventos são manipulados, como o state muda com o tempo e como os dados são preparados para exibição.

## Componentes

Um componente representa parte da interface do usuario. Componentes são reutilizáveis e podem ser utilizados onde voce quiser. Há duas maneiras de se definir um componente: por função ou por classe.

### Função

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

- Sintaxe simplificada;
- Não há controle de ciclo de vida, por exemplo saber quando o componente foi construído ou quando foi destruído;
- Não há controle de estado. Por isso também são chamados de componentes 'stateless';
- Não existe o metodo render e o JSX é retornado direto pelo função;


### Classe

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

**Para os conceitos que serão abordados em diante utilizaremos sempre a sintaxe por classe.**

### Comunicação entre componentes

#### Passando informações do pai para o filho usando Props

Com a idéia de que tudo é componente e que esses componentes podem ser reutilizados, todo componente pode receber dados de um componente pai e também passar dados ao seus componentes filhos. Isto é feito utilizando `props`.

Vamos imaginar dois componentes: `App` e `List`. `App` é o componente que possui os dados da lista na estrutura de Array e `List` é o componente responsável por renderizar uma lista em HTML.

```
//Imports

class App extends React.Component {
  render() {
    const linguagens = ['JAVA', 'Python', 'C#', 'Ruby'];
    return (
        <h3>Linguagens de programação</h3>
        <p><List dados="{linguagens}"/></p>
    );
  }
}

...
```

```
//Imports

class List extends React.Component {
  render() {
    return (
        <ul>{this.props.dados.map((item) => {
            <li>{item}</li>
        })}</ul>
    );
  }
}

...
```

Como podemos ver acima o componente `App` detêm em memória os dados das linguagens de programação e poderíamos renderizar a lista HTML nele mesmo usando JSX. Contudo com a ideia de componentização é preciso sempre avaliar a responsabilidade de cada componente. No caso temos a vantagem do componente `List` poder ser reutilizado por qualquer outro componente para renderizar uma lista HTML. Ele será responsável apenas por renderizar uma lista HTML.

No componente `App` podemos ver que o Array de linguagens é passado para o componente `List` através do atributo do elemento `dados`. Desta forma no componente `List` podemos pegar estes dados através da expressão `this.props.dados`.

Qualquer tipo de dado poderá ser passado e obtido no componente filho através da expressão `this.props`.

##### Em Typescript

Em Typescript precisamos adaptar nosso código do componente filho conforme abaixo:

```
//Imports

type ListProps = {
    dados: any[];
}

class List extends React.Component<ListProps> {
  render() {
    return (
        <ul>{this.props.dados.map((item) => {
            <li>{item}</li>
        })}</ul>
    );
  }
}

...
```

Isso porque o Typescript é uma linguagem tipada e a propriedade `props` precisa ter um tipo. Caso contrário o código não compilará pois não será possível acessar a propriedade `dados` de uma propriedade com tipo indefinido.

#### Passando informações do filho pro pai usando Props

Também e possível passar funções no Props. Isso é muito útil quando queremos que alguma mudança de dado no componente filho chegue até o componente pai.

Vamos adaptar o componente `List` anteriormente descrito para que ele notifique o componente `App` quando um dos itens da lista for clicado:

```
//Imports

class List extends React.Component {
  render() {
    return (
        <ul>{this.props.dados.map((item) => {
            if(this.props.onListItemClicked) {
                return <li onClick={this.props.onListItemClicked.bind(this, item)}>{item}</li>
            } else {
                return <li>{item}</li>
            }
        })}</ul>
    );
  }
}

...
```

Agora no componente pai `App` vamos modificar a declaração do componente `List` adicionado o atributo `onListItemClicked`, conforme criado no componente `List` para especificar uma função `handleLinguagemClicked` que criaremos para escrever no console do navegador a linguagem que foi clicada: 

```
//Imports

class App extends React.Component {

  constructor(props) {
  
    super(props);
    
    this.handleLinguagemClicked = this.handleLinguagemClicked.bind(this);
    
  }
  
  this.handleLinguagemClicked(linguagem) {
     console.log(linguagem);
  }
  
  render() {
    const linguagens = ['JAVA', 'Python', 'C#', 'Ruby'];
    return (
        <h3>Linguagens de programação</h3>
        <p><List dados={linguagens} onListItemClicked={this.handleLinguagemClicked}/></p>
    );
  }
}

...
```

#Children

Como os elementos HTML podemos aninhar componentes dentro de componentes no JSX:

Em HTML:

```
<div>
    <div></div>
    <div></div>
    <div></div>
<div>
```

Em React:

```
...
render() {
    return (
        <Foo>
            <Bar/>
            <Bar/>
            <Bar/>
            <Bar/>
        </Foo>
    );
}
...
```

Também é possível aninhar HTML dentro de um componente:

```
...
render() {
    return (
        <Foo>
            <div>Bar</div>
        </Foo>
    );
}
...
```

E até misturá-los: 

```
...
render() {
    return (
        <Foo>
            <Bar/>
            <div>Bar</div>
        </Foo>
    );
}
...
```

Tudo que é aninhado no JSX dentro de um componente é tratado da mesma forma e poderá ser obtido e renderizado através de `this.props.children`.

