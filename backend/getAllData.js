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

console.log(process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE);


    
    async function getAllData(teachersNames,courseName,) {
        try {
        //const totalClass;
        //const cnpj;
        //const statusAula;
        //const valor;
        //const autorizado;
        //const enviado;
        //const emitido;
        } catch (error) {
            console.error("Erro na consulta:", error);
            throw error;
        }
    };
export default getAllData;
