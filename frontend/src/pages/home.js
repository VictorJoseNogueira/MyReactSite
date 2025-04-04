import React, { useEffect, useState } from "react";
import "./Home.css";
import "./board.css";
import "./header.css";
import "./footer.css";
import Header from "../components/Header.js";
import BoardLeft from "../components/BoardLeft.js";
import BoardRight from "../components/BoardRight.js";
import CNPJFormatado from "../components/CNPJFormatado.js";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [moduleList, setModuleList] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [TeacherList, setTeacherList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCoursesList] = useState([]);

  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
  };

  const handleTeacherChange = (event) => {
    const teacher = event.target.value;
    setSelectedTeacher(teacher);
    const teacherObj = TeacherList.find(item => item.teacher_name === teacher);
  
    if (teacherObj) {
      setModuleList(teacherObj.modules);
      setSelectedModule(""); // Reseta o módulo selecionado
    } else {
      console.error("Professor não encontrado na lista:", teacher);
    }
  };

  const handleCourseChange = (event) => {
    const course = event.target.value;
    if (course === 'Selecione um curso') return;
    setSelectedCourse(course);
    fetch(`http://localhost:5000/teachers?course=${encodeURIComponent(course)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      return response.json();
    })
    .then(data => setTeacherList(data.teacher))
    .catch(error => console.error('Erro ao buscar cursos:', error));
  };

  const handlesendData = () => {
    if (!selectedCourse || !selectedTeacher || !selectedModule) {
      console.error("Cursos, professores e módulos são obrigatórios.");
      return;
    }
    setLoading(true);
    setError(null);
  
    const queryParams = new URLSearchParams({
      course: selectedCourse,
      teacher: selectedTeacher,
      module: selectedModule,
    }).toString();
  
    fetch(`http://localhost:5000/search?${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar os dados do backend");
      return response.json();
    })
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Erro ao enviar dados:", error);
      setError(error.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(response => response.json())
      .then(data => setCoursesList(data.courses))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="home-container">
      <Header />
      <div className="board-content">
        <BoardLeft loading={loading} onSendData={handlesendData} />
        <BoardRight 
          courses={courses}
          selectedCourse={selectedCourse}
          onCourseChange={handleCourseChange}
          TeacherList={TeacherList}
          selectedTeacher={selectedTeacher}
          onTeacherChange={handleTeacherChange}
          moduleList={moduleList}
          selectedModule={selectedModule}
          onModuleChange={handleModuleChange}
          loading={loading}
          error={error}
          data={data}
          CNPJFormatado={CNPJFormatado}
        />
      </div>
    </div>
  );
};

export default Home;
