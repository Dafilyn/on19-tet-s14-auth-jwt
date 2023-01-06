const tarefas = require("../model/tarefa");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const listar = (req, res) => {
  const authHeader = req.get(`Authorization`);
  const token = authHeader.split(" ")[1];
  console.log(`Header:`, token);

  if (!token) {
    return res.status(401);
  }

  const err = jwt.verify(token, SECRET, function (error) {
    if (error) return error;
  });

  if (err) return res.status(401).send("Não autorizado");

  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};

const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  const tarefa = new tarefas(req.body);
  tarefa.save(function (error) {
    if (error) res.status(500).send({ message: error.message });

    res.status(201).send(tarefa.toJSON());
  });
};

// login
const login = (req, res) => {
  tarefas.findOne(
    { email: req.body.email },
    function (error, tarefa) {
      if (error) return res.status(500).send({ message: error.message });
      if (!tarefa)
        return res.status(404).send({ message: "Tarefa não encontrada" });

      const senhaValida = bcrypt.compareSync(
        req.body.password,
        tarefa.password
      );
      if (!senhaValida)
        return res.status(401).send({ message: "Não autorizado" });

      const token = jwt.sign;
    },
    { expiresIn: 300 }
  );
};

const deleteTarefaById = async (req, res) => {
  try {
    const tarefaEncontrada = await tarefas.findById(req.params.id);

    await tarefaEncontrada.delete();

    return res.status(200).send({
      mensagem: `Tarefa '${tarefaEncontrada.descricao}' deletada com sucesso!`,
      tarefaEncontrada,
    });
  } catch (err) {
    return res.status(400).send({
      mensagem: err.message,
    });
  }
};

module.exports = {
  listar,
  postTarefa,
  login,
  deleteTarefaById,
};
