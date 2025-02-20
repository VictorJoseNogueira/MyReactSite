import { useState } from 'react';
import './App.css';
import Dropdown from './components/dropdowns.js';
import TableCreate from './components/table.js';

const placeHolder = '----------';

const courses = [placeHolder, 'Extensivo 2025', 'New Revalida Sem-Extensivo'];
const menuItems = [placeHolder, 'Módulo 1', 'Módulo 2', 'Módulo 3'];

// Objeto que mapeia os dados dos professores
const teacherData = {
  'Afonso da Silva Alves Bento': {
    area: 'Pediatria',
    cnpj: '41213142/0001',
    aulas: 'Gravadas em Edição',
    valor: 'R$ 10.000,00',
    autorizado: 'Não',
    enviado: 'Não',
    emitido: 'Não'
  },
  'Yago Henrique Padovan Chio': {
    area: 'Cirurgia',
    cnpj: '321123392/0001-24',
    aulas: '102',
    valor: 'R$ 12.000,00',
    autorizado: 'Sim',
    enviado: 'Sim',
    emitido: 'Não'
  }
};

function App() {
  // Estados dentro do componente App
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teachers, setTeachers] = useState([placeHolder]); // Estado para armazenar os professores
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  // Função para capturar a mudança no dropdown de cursos e enviar ao backend
  const handleCourseChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCourse(selectedValue);
    if (selectedValue !== placeHolder) {
      await sendDataToBackend(selectedValue);
    }
  };

  // Função para capturar a mudança no dropdown de professores
  const handleTeacherChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedTeacher(selectedValue);
  };

  // Obtém os dados do professor selecionado ou retorna valores vazios
  const selectedData = teacherData[selectedTeacher] || {
    area: '',
    cnpj: '',
    aulas: '',
    valor: '',
    autorizado: '',
    enviado: '',
    emitido: ''
  };

  // Função para enviar os dados ao backend
  const sendDataToBackend = async (course) => {
    setLoading(true); // Ativa o indicador de carregamento
    const data = {
      course
    };

    try {
      const response = await fetch('http://localhost:5000/api/curso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Resposta do back-end:', result); // Log adicional

        // Converte a string JSON em um array de objetos
        let teachersArray = [];
        if (typeof result.teachers === 'string') {
          teachersArray = JSON.parse(result.teachers); // Converte a string para array
        } else if (Array.isArray(result.teachers)) {
          teachersArray = result.teachers; // Já é um array
        }

        // Verifica se teachersArray é um array
        if (Array.isArray(teachersArray)) {
          setTeachers([placeHolder, ...teachersArray.map(teacher => teacher.name)]);
          setError(null); // Limpa o erro se a requisição for bem-sucedida
          setSelectedTeacher(teachersArray[0]?.name || placeHolder); // Seleciona o primeiro professor
        } else {
          setTeachers([placeHolder]);
          setError('Nenhum professor encontrado para este curso.'); // Mensagem de erro
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao enviar os dados'); // Mensagem de erro do back-end
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError('Erro na comunicação com o servidor.'); // Mensagem de erro genérica
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  return (
    <div className="App">
      <header className="header">
        <img className="logo-medcof" src="./logo colored.png" alt="" />
        MedCof
      </header>
      <main className="main">
        <div className="dropdowns-container">
          {/* Dropdown de cursos com onChange */}
          <Dropdown id="courseDropdown" menuItems={courses} onChange={handleCourseChange} />

          {/* Dropdown do professor com evento onChange */}
          <select className="dropdown" onChange={handleTeacherChange}>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>

          <Dropdown menuItems={menuItems} />
        </div>
        {loading && <div className="loading">Carregando...</div>} {/* Indicador de carregamento */}
        {error && <div className="error-message">{error}</div>} {/* Exibe o erro */}
        <div className="table-container">
          {/* Passando os dados selecionados para TableCreate */}
          <TableCreate name={selectedTeacher} {...selectedData} />
        </div>
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;