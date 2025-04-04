import databaseConnector from './databasequerys/dataBaseConector.js';
import getCourses from './databasequerys/getCourses.js';

async function autorizePayCheck(req, res) {
    const { course, teacher, module } = req.query;  // Assumindo que os dados vêm do corpo da requisição
    const getCoursesList = await getCourses();

    const courseNames = getCoursesList.map(item => item.course_name);
    if (!courseNames.includes(course)) {
        return false;
    }
    // Valida os parâmetros
    if (!teacher || !module || !course) {
        return false;
    }

    const query = `SELECT * FROM ${course} WHERE teacher_name = ? AND module = ?;`;
    const result = await databaseConnector(query, [teacher, module]);
      
    // Otimização: Verificar se todas as tarefas estão completadas sem precisar armazenar todos os resultados
    const isOK = result.every(row => row.status_aula.includes('Gravado') || row.status_aula.includes('Editado'));

    if (isOK) {
        return true;
    } else {
        return false;
    }
}

export default autorizePayCheck;

