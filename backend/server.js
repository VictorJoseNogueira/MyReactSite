import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getCourseTeachers from './callingTheGets.js'; 
import getTeacherData from './getTeacherData.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/curso', async (req, res) => {
    try {
        const { course } = req.body;


        // Se apenas o curso for enviado, retorne os professores relacionados
        if (course) {
            const teachersNames = await getCourseTeachers(course);

            console.log("Resposta enviada para o front-end:", { 
                message: 'Professores carregados com sucesso!', 
                teachers: teachersNames 
            });

            return res.status(200).json({ 
                message: 'Professores carregados com sucesso!', 
                teachers: teachersNames 
            });
        }else{
          throw new Error('Dados inválidos: curso obrigatórios.');
        }
        throw new Error('Dados inválidos');

    } catch (error) {
        console.error("Erro no servidor:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/professor', async (req, res) => {
  try {
      const { course, teacher } = req.body;

      if (!course || !teacher) {
          throw new Error('Curso e professor são obrigatórios.');
      }

      const teacherData = await getTeacherData(course, teacher);

      console.log("Resposta enviada para o front-end:", {
          message: 'Dados do professor carregados com sucesso!',
          grandeArea: teacherData
      });

      return res.status(200).json({
          message: 'Dados do professor carregados com sucesso!',
          grandeArea: teacherData
      });
  } catch (error) {
      console.error("Erro no servidor:", error.message);
      res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});