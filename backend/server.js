import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import autorizePayCheck from './src/services/autorizePayCheck.js';
import calculatePayment from './src/services/payCalc.js';
import getTeacherData from './src/services/databasequerys/teacherData.js';
import isRealTeacher from './src/services/databasequerys/isRealTeacher.js';
import takeTeachersName from './src/services/databasequerys/takeTeachersName.js';
// Configuração do ambiente

// Configuração do ambiente
dotenv.config();

// Inicialização do servidor
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
const teacherList = await takeTeachersName();
// Dados iniciais do professor
let teacherData = {
  "Area": "Oftalmo",
  "cnpj": "00.000.000/0001-00",
  "valor": 12000,
  "authorization": true,
  'email': 'M6oFt@example.com',
  'tel': '11999999999',
  "paymentStatus": "Realizado"
};
  

// Função para validar os dados recebidos
const validateInput = (course, teacher, module) => {
  if (!course || !teacher || !module) {
    throw new Error('Cursos, professores e módulos são obrigatórios.');
  }
  if (typeof course !== 'string' || typeof teacher !== 'string' || typeof module !== 'string') {
    throw new Error('Cursos, professores e módulos devem ser strings.');
  }
};

// Função para atualizar os dados do professor
const updateTeacherData = async (teacher, course) => {
  const teacherDataQuery = await getTeacherData(teacher, course);
  teacherData['email'] = teacherDataQuery.email;
  teacherData['tel'] = teacherDataQuery.telefone;
  teacherData['Area'] = teacherDataQuery.especialidade;
  teacherData['cnpj'] = teacherDataQuery.cnpj;
};

// Função para processar o pagamento
const processPayment = async (teacher, module, course) => {
  const payment = await calculatePayment(teacher, module, course);
    teacherData.valor = payment.totalAmount;
    teacherData.authorization = true;
    teacherData.paymentStatus = "Realizado";
    console.log(payment);
      
    return payment;
};

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo ao servidor!',
    teacherList
  });
})
// Rota principal
app.post('/', async (req, res) => {
  const { course, teacher, module } = req.body;

  try {
    // Validação dos dados recebidos
    validateInput(course, teacher, module);

    // Verifica se o professor existe no banco de dados
    const teacherExists = await isRealTeacher(teacher);
    if (!teacherExists) {
      // Se o professor não existir, define todos os campos de teacherData como NULL
      teacherData = {
        "Area": null,
        "cnpj": null,
        "valor": null,
        "authorization": null,
        'email': null,
        'tel': null,
        "paymentStatus": null
      };
      
      return res.status(200).json({
        message: 'Professor não encontrado no banco de dados.',
        teacherInfo: teacherData,
        paymentData: null
      });
    }

    // Atualização dos dados do professor
    await updateTeacherData(teacher, course);

    // Autorização do pagamento
    const isAuthorized = await autorizePayCheck(req, res);
    if (!isAuthorized) {
      teacherData.authorization = false;
      teacherData.paymentStatus = "Negado";
      teacherData.valor = 0;
      return res.status(200).json({
      message: 'Dados do curso carregados com sucesso!',
      teacherInfo: teacherData,
      paymentData: null
    });
    }

    // Processamento do pagamento
    const payment = await processPayment(teacher, module, course);

    // Resposta para o front-end
    return res.status(200).json({
      message: 'Dados do curso carregados com sucesso!',
        
      teacherInfo: teacherData,
      paymentData: payment
    });
  } catch (error) {
    console.error("Erro no processamento:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});