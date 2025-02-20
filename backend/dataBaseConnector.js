import mysql from 'mysql2/promise';

class DatabaseConnector {
  constructor(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE) {
    this.MYSQL_HOST = MYSQL_HOST;
    this.MYSQL_USER = MYSQL_USER;
    this.MYSQL_PASSWORD = MYSQL_PASSWORD;
    this.MYSQL_DATABASE = MYSQL_DATABASE;
    

    this.connection = null; // Inicializa como null
  }

  // Método para conectar ao banco de dados
  async conectarBanco() {
    try {
      this.connection = await mysql.createConnection({
        host: this.MYSQL_HOST,
        user: this.MYSQL_USER,
        password: this.MYSQL_PASSWORD,
        database: this.MYSQL_DATABASE,
        multipleStatements: true, // Permite múltiplas consultas
        connectTimeout: 60000, // Tempo limite de conexão (60s)
        charset: "utf8mb4",  // Suporte a caracteres especiais

      });

      console.log("Conexão bem-sucedida ao MySQL!");
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
    }
  }

  // Método para encerrar a conexão
  async encerrarConexao() {
    if (this.connection) {
      try {
        await this.connection.end();
        console.log("Conexão encerrada.");
      } catch (err) {
        console.error("Erro ao encerrar a conexão:", err.message);
      }
    } else {
      console.log("Nenhuma conexão ativa para encerrar.");
    }
  }

  // Método para executar consultas no banco de dados
  async executarConsulta(sql, params = []) {
    if (!this.connection) {
      console.error("Conexão não estabelecida. Chame 'conectarBanco' primeiro.");
      return null;
    }

    try {
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (err) {
      console.error("Erro ao executar consulta:", err.message);
      return null;
    }
  }
}

export default DatabaseConnector;
