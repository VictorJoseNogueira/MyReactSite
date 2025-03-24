import databaseConnector from "./dataBaseConector.js";

async function getModuleQty(teacher_name, course) {
    if (!teacher_name || !course) {
        return 0;
    }else{

        const query = `SELECT COUNT(DISTINCT module) AS module_count FROM ${course} WHERE teacher_name = ?;`;
        const result = await databaseConnector(query, [teacher_name]);
        return result[0].module_count;
    }
}

export default getModuleQty

