import DatabaseConnector from "./dataBaseConnector.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const queryFindTheName = `
SELECT id_teacher FROM database_relations
WHERE id_course = ?;
`;

const databaseConnector = new DatabaseConnector(
    process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE
);

async function FindTheName(id_curso) {
    if (!id_curso) {
        throw new Error("ID do curso não foi fornecido.");
    }

    console.log(`Procurando os professores do curso com ID: ${id_curso}`);


    try {
        await databaseConnector.conectarBanco();
        console.log("Conexão com o banco estabelecida.");

        const result = await databaseConnector.executarConsulta(queryFindTheName, [id_curso]);


        if (!result || result.length === 0) {
            throw new Error(`Nenhuma informação encontrada para o curso com ID: "${id_curso}".`);
        }
        
        return result;
    } catch (error) {
        console.error("Erro ao buscar professores do curso:", error.message);
        throw new Error("Erro ao consultar o banco de dados.");
    } finally {
        await databaseConnector.encerrarConexao();
        console.log("Conexão com o banco encerrada.");
    }
}

export default FindTheName;

