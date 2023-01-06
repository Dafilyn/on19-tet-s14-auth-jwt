const tarefasController = require("../controller/tarefasController")
const express = require("express");
const router = express.Router();

router.get("/tarefas", tarefasController.listar);
router.post("/novaTarefa", tarefasController.postTarefa);
router.post('/login', tarefasController.login);
router.delete("/delete/:id", controller.deleteTarefaById);

module.exports = router;