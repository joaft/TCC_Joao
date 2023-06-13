const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);

module.exports = UsuarioModel;