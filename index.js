var express = require("express");
const Produto = require("./model/Produto");
var app = express();
var path = require("path");
const mongoose = require('mongoose');

app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("login.ejs", {});
});

app.get("/cadastro", function (req, res) {
  res.render("cadastro.ejs", {});
});



app.get("/titulo", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("titulo.ejs", { Batatas: docs });
  });
});

app.get("/bonito", function (req, res) {
  Produto.find({}).then(function (docs) {
    console.log(docs);
    res.render("bonito.ejs", { Batatas: docs });
  });
});

app.get("/bonito/:id", function (req, res) {
  Produto.findById(req.params.id).then(function (title) {
    res.render("bonito-por-id.ejs", { titulo: title });
  });
});

app.get("/editar/:id", function (req, res) {
  Produto.findById(req.params.id).then(function (docs) {
    res.render("editar.ejs", { Produto: docs });
  });
})

app.post("/titulo", function (req, res) {
  var titulo = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
     resumo: req.body.resumo,
    marca: req.body.marca,
    imagem: req.body.imagem,
    categoria: req.body.categoria,
  });

  titulo.save(function (err, docs) {
    if (err) {
      res.send("Deu o seguinte erro ao cadastrar o titulo: " + err);
    } else {
      res.redirect("/produtos");
    }
  });
});

app.post("/editar/:id", function (req, res) {
  Produto.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      descricao: req.body.descricao,
      resumo: req.body.resumo,
      marca: req.body.marca,
      imagem: req.body.imagem,
      categoria: req.body.categoria,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu o seguinte erro: " + err);
      } else {
        res.redirect("/titulo");
      }
    }
  );
});

app.get("/deletar/:id", function (req, res) {
  Produto.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/titulo");
    }
  });
});


app.get("/produtos", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("list.ejs", { Produtos: docs });
  });
});

app.listen("3000", function () {
  console.log("Conexão iniciada com sucesso!");
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

