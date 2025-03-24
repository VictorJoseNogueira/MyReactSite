import databaseConnector from "./dataBaseConector.js";

async function isRealTeacher(teacher_name) {
    if (!teacher_name) {
        return false;
    } else {
        const query = `SELECT nome AS module_count FROM professores WHERE nome = ?;`;
        const result = await databaseConnector(query, [teacher_name]);
        return result.length > 0;
    }
}

export default isRealTeacher;
