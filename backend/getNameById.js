import DatabaseConnector from "./dataBaseConnector.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const queryGetTeachersName = `
SELECT name FROM professores
WHERE id IN (?);
`;

const databaseConnector = new DatabaseConnector(
    process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE
);

    
    async function getTheName(teachers) {
        try {
            
            const teachersIds = teachers.map(teacher => teacher.id_teacher); // Extrai os IDs
            const placeholders = teachersIds.join(','); // Transforma o array em uma string separada por vírgulas
            
            await databaseConnector.conectarBanco();
            const results = await databaseConnector.executarConsulta(queryGetTeachersName.replace('?', placeholders), []);
    
            await databaseConnector.encerrarConexao();
            return JSON.stringify(results);
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error;
        }
    };
export default getTheName;
