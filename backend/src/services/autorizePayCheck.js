import databaseConnector from './databasequerys/dataBaseConector.js';

async function autorizePayCheck(req, res) {
    const { course, teacher, module } = req.body;  // Assumindo que os dados vêm do corpo da requisição
    const validCourses = ["tarefas", "curso2", "curso3"]; // Substitua com os cursos reais

    // Valida se o curso está na lista de cursos válidos
    if (!validCourses.includes(course)) {
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
