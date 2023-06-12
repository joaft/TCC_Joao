const conexao = require("mongoose");

const uri =
  "mongodb+srv://fred23471:1216joao1216@cluster0.twhy9u2.mongodb.net/?retryWrites=true&w=majority";
conexao.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conexao;
