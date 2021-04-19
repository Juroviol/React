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
