import mysql from "mysql2/promise";
import dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Obtém o diretório do arquivo atual
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configura o dotenv corretamente
dotenv.config({ path: join(__dirname, '../../../.env') });

async function databaseConnector(query, params = []) {
  let connection;
  try {
    // Cria uma nova conexão
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Executa a query
    const [result] = await connection.execute(query, params);
    return result;
  } catch (error) {
    console.error("Erro ao executar a query:", error);
    throw error; // Re-lança o erro para que o chamador possa lidar com ele
  } finally {
    if (connection) {
      await connection.end(); // Fecha completamente a conexão
    }
  }
}

export default databaseConnector;


