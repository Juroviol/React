# Conceitos

- [JSX](#jsx)
- [Componentes](#componentes)
    - [Função](#função)
    - [Classe](#classe)
    - [Comunicação entre componentes](#comunicação-entre-componentes)
        - [Passando informações do pai para o filho usando Props](#passando-informações-do-pai-para-o-filho-usando-props)
            - [Em Typescript](#em-typescript)
        - [Passando informações do filho pro pai usando Props](#passando-informações-do-filho-pro-pai-usando-props)
    - [Estado](#estado)
        - [Criando o objeto state](#criando-o-objeto-state)
        - [Atualizando o objeto state](#atualizando-o-objeto-state)
    - [Ciclo de vida](#ciclo-de-vida)
        - [Mounting](#mounting)
            - [constructor](#constructor)
            - [getDerivedStateFromProps](#getDerivedStateFromProps)
            - [render](#render)
            - [componentDidMount](#componentDidMount)
        - [Updating](#updating)
            - [getDerivedStateFromProps](#getDerivedStateFromProps)
            - [shouldComponentUpdate](#shouldComponentUpdate)
            - [render](#render-1)
            - [getSnapshotBeforeUpdate](#getSnapshotBeforeUpdate)
            - [componentDidUpdate](#componentDidUpdate)
        - [Unmounting](#unmounting)
            - [componentWillUnmount](#componentWillUnmount)
- [Listas e Chaves](#listas-e-chaves)    
- [Children](#children)    
    - [Utilitários](#utilitários)
        - [Loops em .children](#loops-em-children)
        - [Contando .children](#contando-children)
        - [Convertendo .children em um array](#convertendo-children-em-um-array)
        - [Permitir apenas um elemento filho](#permitir-apenas-um-elemento-filho)
        - [Clonando imutavelmente os elementos filhos](#clonando-imutavelmente-os-elementos-filhos)
    - [Callback](#callback)
- [Eventos](#eventos)
    - [Passando argumentos nos manipuladores de eventos](#passando-argumentos-nos-manipuladores-de-eventos)
- [Forms](#forms)
    
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

### Estado

Componentes de classe, ou componentes `stateful`, possuem um objeto inerente chamado `state`. O objeto `state` é onde você armazena valor de propriedades que pertencem ao componente. Quando o objeto `state` muda, o componente é renderizado novamente.

#### Criando o objeto state

O objeto `state` é inicializado no contrutor:

```
//Imports 

class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {brand: "Ford"};
  }
  
  render() {
    return (
      <div>
        <h1>My Car</h1>
      </div>
    );
  }
  
}

...
```

O objeto `state` pode conter quantas propriedades você quiser.

Referencie o objeto `state` em qualquer lugar do seu componente uando a sintaxe `this.state.<propriedade>`:

```
class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
  
}
```

#### Atualizando o objeto state

Para mudar um valor no objeto `state`, utilize o método da classe `this.setState()`.

Quando um valor no objeto `state` mudar, o componente irá renderizar novamente, fazendo com que a saída na tela atualize de acordo com o(s) novo(s) valor(es).

Vamos adicionar um botão com um evento `onClick` que irá alterar a propriedade `color`:

```
//Imports

class Car extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
    this.changeColor = this.changeColor.bind(this);
  }
  
  changeColor() {
    this.setState({color: "blue"});
  }
  
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button
          type="button"
          onClick={this.changeColor}
        >Change color</button>
      </div>
    );
  }
  
}

...
```

### Ciclo de Vida

Cada componente em React possui um ciclo de vida o qual você pode monitorar e manipular durante suas três princiais fases.

As três fases são: Mounting, Updating, and Unmounting.

#### Mounting

Mounting quer dizer colocar elementos no DOM.

React possui quatro métodos inerentes que são chamados, nesta ordem, quando está construindo o componente:

1. constructor()
2. getDerivedStateFromProps()
3. render()
4. componentDidMount()

O método `render()` é obrigatório e será sempre chamado, os outros são opcionais e serão chamados se você defini-los.

##### constructor

O método `constructor()` é chamado antes de tudo, quando o componente é iniciado, e é o local natural para inicializar o objeto `state`, realizar bind dos métodos da classe e outros valores iniciais.

O método `constructor()` é chamado com o props, como argumento, e é aconselhado sempre a chamar `super(props` antes de qualquer coisa, pois isto irá iniciar o contrutor do componente pai e permitir ao componente header métodos de seu pai `React.Component`.

```
//Imports

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
  
}

...
```

##### getDerivedStateFromProps

O método `getDerivedStateFromProps()` é chamado exatamente antes de renderizar os elementos no DOM, ou seja antes do método `render()`.

Este é o local natural para atualizar o objeto `state` baseado nas propriedades iniciais.

Recebe como argumento o `state`, e retorna um objeto com as mudanças no `state`.

O exemplo abaixo inicia com a cor favorita sendo "red", mas o método `getDerivedStateFromProps()` altera a cor favorita baseado no valor do atributo `favcol`:

```
//Imports

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  
  static getDerivedStateFromProps(props, state) {
    return {favoritecolor: props.favcol };
  }
  
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
  
}

...
```

##### render

O método `render()` é obrigatório, e é ele que efetivamente escreve o HTML no DOM.

```
//Imports

class Header extends React.Component {
  
  render() {
    return (
      <h1>This is the content of the Header component</h1>
    );
  }
  
}

...
```

##### componentDidMount

O método `componentDidMount()` é chamado depois do componente ser renderizado.

Este é o local que você executa códigos que requerem que o componente já esteja no DOM.

Este método é muito útil quando precisamos capturar algum elemento no DOM logo ao inicializar o componente.

O exemplo abaixo atualiza a cor para "yellow" após um segundo depois que o componente já foi renderizado. Isso quer 
dizer que será possível ver esta atualização em tela. 

```
//Imports

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  
  render() {
    return (
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
    );
  }
  
}

...
```

#### Updating

A próxima fase no ciclo de vida é quando o componente é atualizado.

O componente é atualizado quando houver mudança no objeto `state` ou `props`.

React possui cinco métodos inerentes que são chamados, nesta ordem, quando o componente é atualizado:

1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

##### getDerivedStateFromProps

Também na atualização o método `getDerivedStateFromProps` é chamado. Agora é o primeiro método que é chamado quando o componente é atualizado.

Para mais detalhes ver em [Mounting](#mounting) conforme já foi explicado quando o componente é construído.

##### shouldComponentUpdate

No método `shouldComponentUpdate()` você pode retornar um valor `Boolean` que especifica se o React deveria continuar com a renderização do componente ou não.

O valor padrão é `true`.

O exemplo abaixo demonstra o que acontece quando o método `shouldComponentUpdate()` retorna `false`:

```
//Imports

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  
  shouldComponentUpdate() {
    return false;
  }
  
  changeColor = () => {
    this.setState({favoritecolor: "blue"});
  }
  
  render() {
    return (
      <div>
      <h1>My Favorite Color is {this.state.favoritecolor}</h1>
      <button type="button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
  
}

...
```

No caso nada acontece ao clicar no botão "Change color", pois com o clique do botão é atualizado o objeto `state` o qual 
inicia o ciclo de vida de atualização e chama o método `shouldComponentUpdate()` o qual retorna falso.

##### render

O método `render()` também é chamado quando o componente atualiza escrevendo no DOM as mudanças de HTML.

##### getSnapshotBeforeUpdate

No método `getSnapshotBeforeUpdate()` você possui acesso as `props` e o objeto `state` antes da atualizaçao, sendo assim podendo verificar quais eram os valores antes da atualização.

Se o método `getSnapshotBeforeUpdate()` foi definido, você deveria também definir o método `componentDidUpdate()`, caso contrário você obterá um erro.

O exemplo abaixo pode parecer complicado, mas tudo o que acontece é isto:

1. Quando o componente é construído é renderizado com a cor favorita: "red".
2. Quando o componente foi construído, um timer altera o objeto `state`, e após um segundo, a cor favorita muda para "yellow".
3. A atualização a partir do timer dispara a fase de atualização, e como o componente define o método `getSnapshotBeforeUpdate()`, o mesmo é executado, e escreve a mensagem no elemento div vazio: DIV1.
4. Quando o método `componentDidUpdate()` é executado, escreve a mensagem no elemento div vazio: DIV2.

```
//Import

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {favoritecolor: "red"};
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML =
    "Antes da atualização, a cor favorita era " + prevState.favoritecolor;
  }
  
  componentDidUpdate() {
    document.getElementById("div2").innerHTML =
    "A cor favorita atualiza é " + this.state.favoritecolor;
  }
  
  render() {
    return (
      <div>
        <h1>Minha cor favorita é {this.state.favoritecolor}</h1>
        <div id="div1"></div>
        <div id="div2"></div>
      </div>
    );
  }
  
}

...
```

##### componentDidUpdate

Quando a atualização do componente já foi renderizada no DOM. O método `componentDidUpdate` é chamado depois do componente ser renderizado.

Este é o local que você executa códigos que requerem que o componente já esteja no DOM.

Este método é muito útil quando precisamos capturar algum elemento no DOM logo ao inicializar o componente.

O funcionamento é o mesmo do método [componentDidMount](#componentDidMount).

#### Unmounting

A próxima fase do ciclo de vida é quando um componente é removido do DOM.

React possui apenas um método inerente que é chamado quando o componente é destruído:

1. componentWillUnmount()

##### componentWillUnmount

O método `componentWillUnmount` é chamado quando o componente está prestes a ser removido do DOM.

O exemplo abaixo demontra o componente `Child` sendo deixado de ser especificado no JSX do componente `Container` quando a propriedadade `show` do objeto `state` se torna `false` a partir do clique no botão "Delete Header".

```
// Imports

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = {show: true};
    this.delHeader = this.delHeader.bind(this);
  }
  
  delHeader() {
    this.setState({show: false});
  }
  
  render() {
    let myheader;
    if (this.state.show) {
      myheader = <Child />;
    };
    return (
      <div>
      {myheader}
      <button type="button" onClick={this.delHeader}>Delete Header</button>
      </div>
    );
  }
  
}

...
```

```
//Imports

class Child extends React.Component {

  componentWillUnmount() {
    alert("The component named Header is about to be unmounted.");
  }
  
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
  
}

...
```

## Listas e Chaves

Para renderizar uma lista não há muito segredo. Nas expressões entre chaves no JSX conseguimos a partir de uma lista gerar vários elementos React para serem renderizados.

Abaixo temos o componente `ProgrammingLanguageList` o qual é responsável por renderizar uma lista em HTML utilizando `ul`:

```
//Imports

class ProgrammingLanguageList extends React.Component {

    render() {
        const languages = ['JAVA', 'Python', 'C#', 'Ruby'];
        return (
            <ul>
                {languages.map(language => <li>{language}<li>)}
            </ul>
        )
    }
    
}

...
```

Ao executar esse código, você receberá um aviso que uma chave deve ser definida para os itens da lista. key é um atributo string especial que você precisa definir ao criar listas de elementos. Iremos analisar os motivos pelos quais isso é importante na próxima seção.

Vamos atribuir uma key aos itens da nossa lista dentro de `languages.map()` e resolver o valor da chave que está em falta:

```
//Imports

class ProgrammingLanguageList extends React.Component {

    render() {
        const languages = ['JAVA', 'Python', 'C#', 'Ruby'];
        return (
            <ul>
                {languages.map(language => <li key={language}>{language}<li>)}
            </ul>
        )
    }
    
}

...
```

As chaves ajudam o React a identificar quais itens sofreram alterações, foram adicionados ou removidos. As chaves devem ser atribuídas aos elementos dentro do array para dar uma identidade estável aos elementos.

A melhor forma de escolher uma chave é usar uma string que identifica unicamente um item da lista dentre os demais. Na maioria das vezes você usaria IDs de seus dados como chave:

```
//Imports

class ProgrammingLanguageList extends React.Component {

    render() {
        const languages = [
            {id: 1, nome: 'JAVA'}, 
            {id: 2, nome: 'Python'}, 
            {id: 3, nome: 'C#'}, 
            {id: 4, nome: 'Ruby'}
        ];
        return (
            <ul>
                {languages.map(language => <li key={language.id.toString()}>{language.nome}<li>)}
            </ul>
        )
    }
    
}

...
```

Quando você não possui nenhum ID estável para os itens renderizados, você pode usar o índice na iteração do item como chave em último recurso. Contudo não é recomendado o uso de índices para chave se a ordem dos itens pode ser alterada. Isso pode impactar de forma negativa o desempenho e poderá causar problemas com o estado do componente.

## Children

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

Seguindo a idéia dos componentes `Foo` e `Bar` poderíamos renderizar o que foi aninhado no JSX dentro de `Foo` da seguinte forma:

```
//Imports

class Foo extends React.Component {
    
    render() {
        return (
            {this.props.children}
        );
    }
    
    
}

...
```

Caso não se queira renderizar os filhos é preciso simplesmente não referenciar `this.props.children` no JSX. Por exemplo, esse componente , não renderiza nenhum elemento filho:

```
//Imports 

class HelloWorld extends React.Component {

    render() {
        return <h1>Hello world!</h1>
    }
    
}

...
```

### Utilitários

Se você pode passar qualquer coisa, você nunca sabe ao certo qual o tipo do elemento filho.
React tem um API que fornece várias funções utilitárias para manipular os elementos filhos de uma maneira bem simples e sem dor de cabeça (você não vai precisar escrever nenhum if).

Essas funções estão disponíveis em **React.Children**.

#### Loops em .children

As duas funções utilitárias mais óbvias são React.Children.map e React.Children.forEach. Elas funcionam exatamente como Array.map e Array.forEach, a única diferença é que elas funcionam em funções, objetos ou qualquer outro tipo de elemento passado como elemento filho.

```
//Imports

class IgnoreFirstChild extends React.Component {

  render() {
    const children = this.props.children
    return (
      <div>
        {React.Children.map(children, (child, i) => {
          // Ignora o primeiro elemento filho
          if (i < 1) return
          return child
        })}
      </div>
    )
  }
  
}

...
```

O componente , itera todos os elementos filhos, ignorando o primeiro e retornando todos os outros.

```
<IgnoreFirstChild>
  <h1>First</h1>
  <h1>Second</h1> // <- Só esse será renderizado
</IgnoreFirstChild>
```

Você pode pensar que poderíamos ter usado `this.props.children.map`. Mas, o que aconteceria se alguém passe-se uma função como elemento filho? `this.props.children` seria uma função ao invés de um array, e isso retornaria uma erro!

#### Contando .children

Levando em conta que `this.props.children` pode ser qualquer tipo, contar quantos elementos filhos um componente tem, começa a ser uma tarefa complicada. Ingenuamente, usar `this.props.children.length` iria quebrar caso passássemos uma nó de texto ou uma função. Nós teríamos apenas um elemento filho, “Hello World!”, mas o `.length` iria retornar um valor de 12!

É por isso que nós temos a função utilitária **React.Children.count**:

```
//Imports

class ChildrenCounter extends React.Component {

  render() {
    return <p>React.Children.count(this.props.children)</p>
  }

}

...
```

Ele retorna o número de elementos filhos, independente do tipo:

```
// Renderiza "1"
<ChildrenCounter>
  Second!
</ChildrenCounter>

// Renderiza "2"
<ChildrenCounter>
  <p>First</p>
  <ChildComponent />
</ChildrenCounter>

// Renderiza "3"
<ChildrenCounter>
  {() => <h1>First!</h1>}
  Second!
  <p>Third!</p>
</ChildrenCounter>
```

#### Convertendo .children em um array

Como último recurso, se nenhum dos métodos acima te ajudarem, você pode converter seu elemento filho em um array usando **React.Children.toArray**. Isso seria útil caso, por exemplo, você precisar ordenar eles:

```
//Imports

class Sort extends React.Component {
  
  render() {
    const children = React.Children.toArray(this.props.children)
    // Ordenando e renderizando os elementos filhos
    return <p>{children.sort().join(' ')}</p>
  }
  
}

...
```

E para usá-lo:

```
<Sort>
  // Estamos usando “expression containers” para ter certeza
  // que serão passados 3 nós de texto, e não apenas um
  {'bananas'}{'oranges'}{'apples'}
</Sort>
```

#### Permitir apenas um elemento filho

Se olharmos nosso primeiro exemplo, ele está esperando receber apenas um elemento filho, que nesse caso é uma função:

```
//Imports

class Executioner extends React.Component {

  render() {
    return this.props.children()
  }
  
}

...
```

Para garantir que apenas um elemento filho seja executado, caso passem mais de um elemento filho, podemos usar **React.Children.only** dentro do nosso método render:

```
//Imports

class Executioner extends React.Component {
  
  render() {
    return React.Children.only(this.props.children)()
  }
  
}

...
```

#### Clonando imutavelmente os elementos filhos

A última, mas não menos importante, função utilitária de hoje, como o título sugere, é **React.cloneElement**, para clonar elementos. Nós passamos o elemento alvo como primeiro argumento, e como segundo argumento nós podemos passar um objeto de propriedades que queremos que sejam adicionadas no elemento alvo:

```
const cloned = React.cloneElement(element, {
  new: 'yes!'
})
```

Como resultado, o elemento **cloned** terá uma propriedade `props.new` com valor ”yes!”.

Vamos imaginar o seguinte exemplo:

```
<RadioGroup>
  <RadioButton value="first">First</RadioButton>
  <RadioButton value="second">Second</RadioButton>
  <RadioButton value="third">Third</RadioButton>
</RadioGroup>
```

Como sabemos para agrupar radio buttons precisamos utilizar ara agrupar os inputs nós precisamos passar um atributo name para cada um deles. Contudo ter que passar para cada um dos `RadioButton` é tedioso e propenso a erros. 

Ao invés de passar para cada `RadioButton` o atributo name, nós vamos passar o atributo name para o `RadioGroup` e internamente editar os filhos e passar este atributo para cada um deles:

```
//Imports

class RadioGroup extends React.Component {

    constructor() {
        super()
        // Realizando o .bind em React ES6
        this.renderChildren = this.renderChildren.bind(this)
    }
    
    renderChildren() {
        //Iteramos por cada filho
        return React.Children.map(this.props.children, child => {
            //Clonamos o elemento e adicionamos o atributo name
            //que foi passado 
            return React.cloneElement(child, {
                name: this.props.name
            })
        })
    }
   
    render() {
        return (
            <div className="group">
                {this.renderChildren()}
            </div>
        )
    }
    
}

...
```





### Callback

É possível também passar de forma aninhada no JSX até um callback:

```
...  
    render() {
        return (
            <Foo>
                {() => <span>Bar</span>}
            </Foo>
        );
    }
...
```

A diferença é que nosso componente `Foo` precisamos invocar `this.props.children` como se fosse uma funcão:

```
//Imports

class Foo extends React.Component {
    
    render() {
        return (
            {this.props.children()}
        );
    }
    
    
}

...
```

Isso é muito útil para se definir por exemplo um template customizado de um componente que já tem um template padrão com a possibilidade de neste template customizado obtermos e utilizarmos algum dado que é interno do componente o qual o callback está sendo aninhado.

Em [exemplos](../exemplos) poderá ser encontrado o exemplo do componente [datatable](../exemplos/datatable/src/App.tsx) o qual é aplicado a utilização de um callback como children de outro componente.


## Eventos

Por exemplo, com HTML:

```
<button onclick="activateLasers()">
  Ativar lasers
</button>
```

É ligeiramente diferente com React:

```
<button onClick={this.activateLasers}>
  Ativar lasers
</button>
```

Outra diferença é que você não pode retornar false para evitar o comportamento padrão no React. Você deve chamar `preventDefault` explícitamente. Por exemplo, com HTML simples, para evitar que um link abra uma nova página, você pode escrever:

```
<a href="#" onclick="console.log('O link foi clicado.'); return false">
  Clique Aqui
</a>
```

No React, isso poderia ser:

```
//Imports 

class ActionLink extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    function handleClick(e) {
        e.preventDefault();
        console.log('O link foi clicado.');
    }
    
    render() {
        return (
            <a href="#" onClick={this.handleClick}>
                Clique Aqui
            </a>
        );
    }   

}

...    
```

Você precisa ter cuidado com o significado do this nos callbacks do JSX. Em JavaScript, os métodos de classe não são vinculados por padrão. Se você esquecer de fazer o bind de this.handleClick e passá-lo para um onClick, o this será undefined quando a função for realmente chamada.

### Passando argumentos nos manipuladores de eventos

Dentro de uma estrutura de repetição, é comum querer passar um parâmetro extra para um manipulador de evento. Por exemplo, se id é o ID de identificação da linha, a sintaxe a seguir funcionará:

```
<button onClick={this.deleteRow.bind(this, id)}>Deletar linha</button>
```

## Forms

//TODO
