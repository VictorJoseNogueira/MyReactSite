import { useState } from 'react';
import './App.css';
import Dropdown from './components/dropdowns.js';
import TableCreate from './components/table.js';

const placeHolder = '----------';

const courses = [placeHolder, 'Extensivo 2025', 'New Revalida Sem-Extensivo'];
const menuItems = [placeHolder, 'Módulo 1', 'Módulo 2', 'Módulo 3'];

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
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [teachers, setTeachers] = useState([placeHolder]);
  const [area, setGrandeArea] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCourseChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCourse(selectedValue);

    if (selectedValue !== placeHolder) {
      await sendCourseToBackend(selectedValue);
    } else {
      setTeachers([placeHolder]);
      setSelectedTeacher(placeHolder);
    }
  };

  const handleTeacherChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedTeacher(selectedValue);
  
    if (selectedValue !== placeHolder) {
      await sendTeacherToBackend(selectedValue, selectedCourse); // Usando selectedCourse correto
    }
  };
  

  const selectedData = teacherData[selectedTeacher] || {
    area: area ||'',
    cnpj: '',
    aulas: '',
    valor: '',
    autorizado: '',
    enviado: '',
    emitido: ''
  };

  const sendCourseToBackend = async (course) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/curso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido no backend');
      }

      const result = await response.json();
      console.log('Resposta do backend:', result);

      let teachersArray = [];
      if (typeof result.teachers === 'string') {
        teachersArray = JSON.parse(result.teachers);
      } else if (Array.isArray(result.teachers)) {
        teachersArray = result.teachers;
      }

      if (teachersArray.length > 0) {
        setTeachers([placeHolder, ...teachersArray.map(t => t.name)]);
        setSelectedTeacher(teachersArray[0].name);
      } else {
        setTeachers([placeHolder]);
        setSelectedTeacher(placeHolder);
        setError('Nenhum professor encontrado.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendTeacherToBackend = async (teacher, course) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/professor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teacher, course })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro desconhecido no backend');
      }

      const result = await response.json();
      console.log('Resposta do backend:', result);

      // Atualiza a grandeArea com base na resposta do backend
      if (result.grandeArea) {
        setGrandeArea(result.grandeArea);
        console.log('Grande Área atualizada:', result.grandeArea);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        MedCof
      </header>
      <main className="main">
        <div className="dropdowns-container">
          <Dropdown id="courseDropdown" menuItems={courses} onChange={handleCourseChange} />

          <select className="dropdown" onChange={handleTeacherChange}>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>

          <Dropdown menuItems={menuItems} />
        </div>
        <div className="table-container">
          <TableCreate name={selectedTeacher} {...selectedData} />
        </div>
      </main>
        {loading && <div className="loading">Carregando...</div>}
        {error && <div className="error-message">{error}</div>}
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;