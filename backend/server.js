import express from 'express';
import cors from 'cors'; // Para permitir requisições do frontend
import bodyParser from 'body-parser';
import getTheCourseID from "./getCourseId.js";
import FindTheName from "./getTeachersId.js";
import getTheName from "./getNameById.js";

const app = express();
const PORT = 5000;

// Middleware para permitir CORS e processar JSON
app.use(cors());
app.use(bodyParser.json());

// Rota para receber os dados do frontend
app.post('/api/curso', async (req, res) => {
  try {
      const { course } = req.body;
      console.log('Dados recebidos do frontend:', { course });

      const courseID = await getTheCourseID(JSON.stringify(course));
      
      if (!courseID || courseID.length === 0) {
          return res.status(404).json({ error: 'Curso não encontrado no banco de dados.' });
      }

      console.log("ID do curso encontrado:", courseID[0]);

      const teachers = await FindTheName(courseID[0].id_curso);
      
      if (!teachers || teachers.length === 0) {
          return res.status(404).json({ error: 'Nenhum professor encontrado para este curso.' });
      }

      const teachersNames = await getTheName(teachers); // Chama a função corrigida

      console.log("Resposta enviada para o front-end:", { message: 'Dados recebidos com sucesso!', teachers: teachersNames });
      res.status(200).json({ message: 'Dados recebidos com sucesso!', teachers: teachersNames });
  } catch (error) {
      console.error("Erro no servidor:", error.message);
      res.status(500).json({ error: "Erro interno no servidor." });
  }
});



// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});