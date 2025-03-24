 import databaseConnector from "../databasequerys/dataBaseConector.js";

async function getTime(teacher_name, module, course) {
    const query = `SELECT duration FROM ${course} WHERE teacher_name = ? AND module = ? AND (status_aula = "Gravado" OR status_aula = "Editado");`;
    const result = await databaseConnector(query, [teacher_name, module]);
    let totalSeconds = result.reduce((acc, row) => {
        let [hour,min,seconds] = row.duration.split(":").map(Number);
        return acc + (hour * 3600) + (min * 60) + seconds;
    }, 0)
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

export default getTime

