import React from "react";
import Dropdown from "./dropdown"; // Ensure correct case
import DropdownTeacher from "./dropdownTeacher"; // Ensure correct case
import "../pages/board.css";

const BoardRight = ({
  courses,
  selectedCourse,
  onCourseChange,
  TeacherList,
  selectedTeacher,
  onTeacherChange,
  moduleList,
  selectedModule,
  onModuleChange,
  loading,
  error,
  data,
  CNPJFormatado
}) => (
  <div className="board-right">
    <div className="board-right-top">
      <Dropdown
        listItems={courses}
        onChange={onCourseChange}
        value={selectedCourse}
        placeholder="Selecione um curso"
      />
      <DropdownTeacher
        listItems={TeacherList}
        onChange={onTeacherChange}
        value={selectedTeacher}
        placeholder="Professor"
      />
      <Dropdown
        listItems={moduleList}
        onChange={onModuleChange}
        value={selectedModule}
        placeholder="Módulo"
      />
    </div>
    <div className="board-right-bottom">
      {loading && (
        <div className="alert info">Carregando dados...</div>
      )}
      {error && (
        <div className="alert error">Erro: {error}</div>
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
                <tr><th><strong>Área:</strong></th></tr>
                <tr><th><strong>CNPJ:</strong></th></tr>
                <tr><th><strong>Valor:</strong></th></tr>
                <tr><th><strong>Autorização:</strong></th></tr>
                <tr><th><strong>Status do Pagamento:</strong></th></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default BoardRight;
