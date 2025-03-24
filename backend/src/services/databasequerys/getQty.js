import databaseConnector from "./dataBaseConector.js";

async function getQty(teacher_name, module, course) {
    if (!teacher_name || !module || !course) {
        return 0;
    }else{

        const query = `SELECT Count(*) FROM ${course} WHERE teacher_name = ? AND module = ? AND (status_aula = "Gravado" OR status_aula = "Editado");`;
        const result = await databaseConnector(query, [teacher_name, module]);
        return  result[0]['Count(*)'];
    }
}

export default getQty


