const conexao = require("../config/database");
var {Schema, model} = require("mongoose")

var ProdutoSchema = conexao.Schema({
  nome:           { type: 'String' },
  descricao:      { type: 'String' },
  marca:          { type: 'String' },
  resumo:          { type: 'String' },
  imagem:          { type: 'Buffer' },
  categoria:          { type: 'String' },
});

module.exports = conexao.model("Produto", ProdutoSchema);


