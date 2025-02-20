import { useState } from 'react';
import './App.css';
import Dropdown from './components/dropdowns';
import TableCreate from './components/table';

const courses = ['----------', 'Extensivo 2025', 'Revalida'];
const menuItems = ['----------', 'Módulo 1', 'Módulo 2', 'Módulo 3'];
const teachers = ['----------', 'Antônio Carlos', 'Carlos Antônio','Julio Nascimento'];

// Objeto que mapeia os dados dos professores
const teacherData = {
  'Antônio Carlos': {
    area: 'Pediatria',
    cnpj: '41213142/0001',
    aulas: 'Gravadas em Edição',
    valor: 'R$ 10.000,00',
    autorizado: 'Não',
    enviado: 'Não',
    emitido: 'Não'
  },
  'Julio Nascimento': {
    area: 'Cirurgia',
    cnpj: '321123392/0001-24',
    aulas: '102',
    valor: 'R$ 12.000,00',
    autorizado: 'Sim',
    enviado: 'Sim',
    emitido: 'Não'
  },
  'Carlos Antônio': {
    area: 'Cirurgia',
    cnpj: '321133392/0001-24',
    aulas: '12',
    valor: 'R$ 11.000,00',
    autorizado: 'Não',
    enviado: 'Não',
    emitido: 'Não'
  }

};

function App() {
  // Estado para armazenar o professor selecionado
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Atualiza o estado ao mudar o dropdown
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
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

  return (
    <div className="App">
      <header className="header">
        <img className='logo-medcof' src="./logo colored.png" alt="" />
        MedCof
      </header>
      <main className="main">
        <div className="dropdowns-container">
          <Dropdown menuItems={courses} />
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
