import DatabaseConnector from "./dataBaseConnector.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const queryFindIdAndTableName = `
SELECT id_curso, tableName FROM cursos
WHERE nome_curso = ?;
`;

const tableNameList = {
    'Extensivo 2025': 'asana_tasks_extensivo',
    'New Revalida Sem-Extensivo': 'asana_tasks_revalida',
};

const databaseConnector = new DatabaseConnector(
    process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE
);


async function getTheCourseID(courseNameFront) {
    if (!courseNameFront) {
        throw new Error("Nome do curso não foi fornecido.");
    }

    const courseName = JSON.parse(courseNameFront);
    console.log(`Procurando curso: ${courseName}`);

    try {
        await databaseConnector.conectarBanco();
        console.log("Conexão com o banco estabelecida.");

        const result = await databaseConnector.executarConsulta(queryFindIdAndTableName, [courseName]);

        if (!result || result.length === 0) {
            console.warn(`Nenhuma tabela encontrada para o curso: "${courseName}".`);
            return []; // Retorna array vazio ao invés de lançar erro
        }
        console.log(result);
        return result; // Retorna a lista de cursos encontrados

    } catch (error) {
        console.error("Erro ao buscar ID e tabela do curso:", error.message);
        return []; // Retorna array vazio ao invés de lançar erro
    } finally {
        await databaseConnector.encerrarConexao();
        console.log("Conexão com o banco encerrada.");
    }
}



export default getTheCourseID;
