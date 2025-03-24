import React, { useState } from "react";
import './Home.css'; // Arquivo CSS para estilização
import './board.css'; // Arquivo CSS para estilização
import './header.css'; // Arquivo CSS para estilização
import './footer.css'; // Arquivo CSS para estilização
import { FaChevronDown } from "react-icons/fa";
// In your JSX
const course = "tarefas";
const teacher = "Carlos";
const module = "Módulo 1";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlesendData() {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course, teacher, module }),
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
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
        setError(error.message);
        setLoading(false);
      });
  }

  return (
    <div className="home-container">
      <div className="header">
      <h1>Bem-vindo à Home! </h1>

      </div>
      <div className="board-content">


      <div className="board-left">

      <div className="board-left-top">
        <div className="placeholderImge"></div>
      </div>



        <div className="board-left-bottom">
          <div className="button-container">
            <button
              className="primary-button"
              onClick={handlesendData}
              disabled={loading}
            >
              {loading ? "Carregando..." : "Pagar professor"}
            </button>
          </div>
        </div>

        </div>

        <div className="board-right">

          <div className="board-right-top">
            <button>
              Curso: {course} <FaChevronDown />

            </button>
            <button>
              Professor: {teacher} <FaChevronDown />

            </button>
            <button>
              Módulo: {module} <FaChevronDown />

            </button>
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
      <div className="card-content">
        <h2>Dados do Professor:</h2>
        <p><strong>Área:</strong> {data.teacherInfo.Area}</p>
        <p><strong>CNPJ:</strong> {data.teacherInfo.cnpj}</p>
        <p><strong>Valor:</strong> R$ {data.teacherInfo.valor}</p>
        <p><strong>Autorização:</strong> {data.teacherInfo.authorization ? "Sim" : "Não"}</p>
        <p><strong>Status do Pagamento:</strong> {data.teacherInfo.paymentStatus}</p>
      </div>
    </div>
  ) : (
    <div className="card">
      <div className="card-content">
        <h2>Dados do Professor:</h2>
        <p><strong>Área:</strong> </p>
        <p><strong>CNPJ:</strong> </p>
        <p><strong>Valor:</strong> R$ </p>
        <p><strong>Autorização:</strong> </p>
        <p><strong>Status do Pagamento:</strong> </p>
      </div>
    </div>
  )}
</div>
        </div>
      
      
            </div>
      </div>
  );
};

export default Home;