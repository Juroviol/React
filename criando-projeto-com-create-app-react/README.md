 # Criando um projeto com Create React App

**Create React App** é uma ferramenta que auxilia a construção de projetos React. Não é necessário instalar ou configurar ferramentas como webpack ou Babel. Eles são previamente configurados e escondidos para que o foco seja somente na codificação.

**Create React App** é um ambiente confortável para aprender React, e é a melhor maneira de começar um single-page application em React.

Além de configurar seu ambiente de desenvolvimento para utilizar as funcionalidades mais recentes do JavaScript, ele fornece uma experiência de desenvolvimento agradável, e otimiza o seu app para produção. Será necessário ter Node >= 10.16 e npm >= 5.6 na sua máquina. Para criar um novo projeto, rode:

```
npx create-react-app my-app
cd my-app
npm start
```

Quando estiver pronto pra mandar pra produção, rode npm run build para criar e mandar o build otimizado de seu app para a pasta build.

## Criando uma aplicação TypeScript

Você pode criar uma nova aplicação Typescrit utilizando templates. Para usar o template Typescript padrão da ferramenta, adicione --template typescript no comando de criação.

```
npx create-react-app my-app --template typescript
```

## Selecionando um gerenciador de pacotes

Quando você cria uma nova aplicação, o CLI irá utilizar o Yarn para instalar as dependências (se disponível). Se você não tiver o Yarn instalado, mas prefira utilizar o npm, você pode adicionar --use-npm ao comando de criação. Por exemplo:

```
npx create-react-app my-app --use-npm
```

## Adicionado variáveis de ambiente em .env

Para definir variáveis de ambiente permanentes, crie um arquivo chamado .env na raíz do seu projeto:

```
REACT_APP_NOT_SECRET_CODE=abcdef
```

Nota: Você deve criar variáveis de ambiente customizadas começando com o prefixo REACT_APP_. Qualquer outras variáveis, exceto NODE_ENV, serão ignoradas para evitar expor acidentalmente uma chave privada na máquina que pode ter o mesmo nome. Mudar qualquer variável de ambiente irá necessitar que você reinicie o servidor de desenvolvimenti se estiver executando.

Nota: Você precisa restartar o servidor de desenvolvimento após mudar arquivos .env.

É recomando que arquivos .env estejam no seu repositório de código e controle de versão (com a exceção do arquivo .env*.local).

### Quais tipos de arquivo .env podem ser utilizados?

.env: Padrão.
.env.local: Substituições locais. Este arquivo é carregado para todos os ambientes exceto test.
.env.development, .env.test, .env.production: Configurações de ambiente.
.env.development.local, .env.test.local, .env.production.local: Substituições locais para configurações de ambiente.

