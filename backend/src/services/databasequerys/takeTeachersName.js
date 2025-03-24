import databaseConnector from "./dataBaseConector.js";

async function takeTeachersName() {
    const query = `
    SELECT DISTINCT nome FROM professores;
    `;
    const result = await databaseConnector(query);
    return result;
}

export default takeTeachersName;
