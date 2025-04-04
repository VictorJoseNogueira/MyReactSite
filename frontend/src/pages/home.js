import React, { useEffect, useState } from "react";
import './Home.css'; // Arquivo CSS para estilização
import './board.css'; // Arquivo CSS para estilização
import './header.css'; // Arquivo CSS para estilização
import './footer.css'; // Arquivo CSS para estilização
import Dropdown from "../components/dropdown";
import DropdownTeacher from "../components/dropdownTeacher.js";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedOption] = useState('');
  const [moduleList, setModuleList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [TeacherList, setTeacherList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCoursesList] = useState([]);

  
  const handleModuleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTeacherChange = (event) => {
    const teacher = event.target.value;
    setSelectedTeacher(teacher);
    const teacherObj = TeacherList.find(item => item.teacher_name === teacher);
  
    if (teacherObj) {
      setModuleList(teacherObj.modules);
      
    } else {
      console.error("Professor não encontrado na lista:", teacher);
    }
  
  };


  const handleCourseChange = (event) => {

    const course = event.target.value;
    console.log(course);

    if (course === 'Selecione um curso') {
      return; 
  }
    setSelectedCourse(course);
    fetch(`http://localhost:5000/teachers?course=${encodeURIComponent(course)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
  })
  .then(data => {
    setTeacherList(data.teacher);
    })
    .catch(error => console.error('Erro ao buscar cursos:', error));
  };
  


  function handlesendData() {
    console.log(selectedCourse);
    console.log(selectedTeacher);
    console.log(selectedModule);
    if (!selectedCourse || !selectedTeacher || !selectedModule) {
      console.error("Cursos, professores e módulos são obrigatórios.222");
      return;
    }
    setLoading(true);
    setError(null);
  
    const queryParams = new URLSearchParams({
      course: selectedCourse,
      teacher: selectedTeacher,
      module: selectedModule,
    }).toString();
    console.log(queryParams);

    fetch(`http://localhost:5000/search?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do backend");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
        setError(error.message);
        setLoading(false);
      });
  }
  

  const CNPJFormatado = ({ cnpj }) => {
    const formatar = (cnpj) => {
      const numeros = cnpj.replace(/\D/g, '');
      if (numeros.length !== 14) return cnpj;
      return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    };

    return <span>{formatar(cnpj)}</span>;
  };

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => {
        setCoursesList(data.courses);
        console.log(data.courses);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <div className="home-container">
      <div className="header">
        <h1>Bem-vindo à Home!</h1>
      </div>
      <div className="board-content">
        <div className="board-left">
          <div className="board-left-top">
            <div className="frame-round">
              <img id="frame-round-person" src="teacher-square.jpg" alt="fake person face" />
              <img id="frame-round-frame" src="roundFrameWood2.png" alt="roun wooden frame" />
            </div>
          </div>
          <div className="board-left-bottom">
            <div className="button-container">
              <button
                className="primary-button"
                onClick={handlesendData}
                disabled={loading}
              >
                {loading ? "Carregando..." : "Ver professor"}
              </button>
            </div>
          </div>
        </div>
        <div className="board-right">
          <div className="board-right-top">
            <Dropdown
              listItems={courses}
              onChange={handleCourseChange}
              value={selectedCourse}
              placeholder="Selecione um curso"
            >
            </Dropdown>
            <DropdownTeacher
              listItems={TeacherList}
              onChange={handleTeacherChange}
              value={selectedTeacher}
              placeholder="Professor"
            ></DropdownTeacher>
            <Dropdown
              listItems={moduleList}
              onChange={handleModuleChange}
              value={selectedModule}
              placeholder="modulo"
            ></Dropdown>



          </div>
          <div className="board-right-bottom">
            {loading && (
              <div className="alert info">
                Carregando dados...
              </div>
            )}
            {error && (
              <div className="alert error">
                Erro: {error}
              </div>
            )}
            {data && data.teacherInfo ? (
              <div className="card">
                <div className="card-body">
                
                  <h2>Dados do Professor:</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>Área:</th>
                        <td>{data.teacherInfo.Area}</td>
                      </tr>
                      <tr>
                        <th>CNPJ:</th>
                        <td><CNPJFormatado cnpj={data.teacherInfo.cnpj} /></td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{data.teacherInfo.email}</td>
                      </tr>
                      <tr>
                        <th>Valor:</th>
                        <td> R$ {data.teacherInfo.valor}</td>
                      </tr>
                      <tr>
                        <th>Autorização:</th>
                        <td>{data.teacherInfo.authorization ? "Sim" : "Não"}</td>
                      </tr>
                      <tr>
                        <th>Status do Pagamento:</th>
                        <td>{data.teacherInfo.paymentStatus}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="button-container">
                    <button>Pagar professor</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <h2>Dados do Professor:</h2>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          <strong>Área:</strong>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <strong>CNPJ:</strong>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <strong>Valor:</strong>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <strong>Autorização:</strong>
                        </th>
                      </tr>
                      <tr>
                        <th>
                          <strong>Status do Pagamento:</strong>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
