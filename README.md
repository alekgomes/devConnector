# Olá
Bem vindo a minha versão do DevConnector.
O DevConnector surgiu como projeto de um curso focado na MERN stack, lecinado na Udemy pelo Brad Traversy.

Contudo, essa versão se difere em algumas coisas do código original proposto, desde que eu a utilizo como um playground para aplicar técnicas e tecnologias que venho estudando.


# Sobre o projeto
O projeto utiliza a stack MERN (Mongo, Express, React, Node) e funciona como uma pequena rede social onde desenvolvedores podem cadastrar um perfil com informações profissionais, informações acadêmicas; também será possível publicar e interagir com posts.

# Rodando o projeto
Para rodar o projeto localmente

Add um arquivo default.json na pasta config com o seguinte:

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

Install server dependencies

```
npm install
```

Install client dependencies

```
cd client
npm install
```

Rode ambos Express & React a partir do root

```
npm run dev
```