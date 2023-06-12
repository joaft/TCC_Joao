const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Configurar a conexão com o MongoDB
mongoose.connect('mongodb+srv://fred23471:1216joao1216@cluster0.twhy9u2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  })
  .catch((error) => {
    console.log('Erro ao conectar com o MongoDB:', error);
  });

// Definir o esquema do usuário
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Criar o modelo de usuário
const User = mongoose.model('User', userSchema);

// Configurar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Configurar o middleware para analisar os dados do formulário
app.use(express.urlencoded({ extended: true }));

// Rota para exibir o formulário de cadastro
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

// Rota para lidar com o envio do formulário de cadastro
app.post('/cadastro', (req, res) => {
  const { name, email, password } = req.body;

  // Criar uma instância do modelo User com os dados do formulário
  const newUser = new User({
    name: name,
    email: email,
    password: password
  });

  // Salvar o usuário no banco de dados
  newUser.save()
    .then(() => {
      console.log('Usuário cadastrado com sucesso!');
      // Redirecionar o usuário para a rota bonito após o cadastro
      res.redirect('/bonito'); // Substitua com a rota desejada
    })
    .catch((error) => {
      console.log('Erro ao cadastrar usuário:', error);
      res.redirect('/cadastro'); // Em caso de erro, redirecionar de volta para o formulário de cadastro
    });
});

// Rota para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Rota para lidar com o envio do formulário de login
app.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    // Verificar se o usuário existe no banco de dados
    User.findOne({ name: name, password: password })
      .then((user) => {
        if (user) {
          console.log('Usuário autenticado com sucesso!');
          // Redirecionar o usuário para a rota bonito após o login
          res.redirect('/bonito'); // Substitua com a rota desejada
        } else {
          console.log('Nome de usuário ou senha inválidos!');
          res.redirect('/login'); // Em caso de falha de autenticação, redirecionar de volta para o formulário de login
        }
      });
  });