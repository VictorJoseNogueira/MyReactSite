import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap

const aspas = `Victor
Marina
Olivia
Bruna
Carlos
Quintino
Karina`;

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
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Bem-vindo à Home!</h1>
        <h2 className="mt-3">Curso: {course}</h2>
        <h3>Professor: {teacher}</h3>
        <h3>Módulo: {module}</h3>
      </div>

      {loading && (
        <div className="alert alert-info mt-4" role="alert">
          Carregando dados...
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          Erro: {error}
        </div>
      )}

      {data && data.teacherInfo && (
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Dados do Professor:</h2>
            <p className="card-text"><strong>Área:</strong> {data.teacherInfo.Area}</p>
            <p className="card-text"><strong>CNPJ:</strong> {data.teacherInfo.cnpj}</p>
            <p className="card-text"><strong>Valor:</strong> R$ {data.teacherInfo.valor}</p>
            <p className="card-text"><strong>Autorização:</strong> {data.teacherInfo.authorization ? "Sim" : "Não"}</p>
            <p className="card-text"><strong>Status do Pagamento:</strong> {data.teacherInfo.paymentStatus}</p>
          </div>
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={handlesendData}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Enviar professor"}
        </button>
      </div>
    </div>
  );
};

export default Home;