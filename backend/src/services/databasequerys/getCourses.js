import databaseConnector from './dataBaseConector.js';
async function getCourses() {
    try {
        const query = `SELECT DISTINCT course_name FROM courses;`;
        const result = await databaseConnector(query);
        return result;
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        throw error;
    }
}

export default getCourses;
