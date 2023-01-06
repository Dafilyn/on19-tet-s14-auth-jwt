const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    descricao: { 
        type: String 
    },
    dataInclusao: { 
        type: String 
    },
    concluido: { 
        type: Boolean 
    },
    nome: { 
        type: String 
    },
    password: { 
        type: String 
    },
    
},{
    timestamps: true
})

const tarefas = mongoose.model('tarefas', tarefaSchema);

module.exports = tarefas