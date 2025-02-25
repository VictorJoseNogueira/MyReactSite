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


    let testado = 'medicina';
    
    async function getTeacherData(courseName, teacherName) {
        return testado;
    }
export default getTeacherData;
