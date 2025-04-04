import databaseConnector from './dataBaseConector.js';
import getCourses from './getCourses.js';



const course = 'tarefas';
async function getTeachers(course) {
    try {
        const teachersModules = [];
        const validCourses = await getCourses();
        const isValid = validCourses.some(item => Object.values(item).includes(course));

        if (!isValid) {
            return 0;}
        
        const queryTeachers = `SELECT DISTINCT teacher_name FROM ${course} ;`;
        const teachers = await databaseConnector(queryTeachers);
        const newQuery = `
            SELECT Distinct module
            FROM ${course}
            WHERE teacher_name = ?
            ORDER BY module;
        `;

        for (let teacher of Object.values(teachers)) {
            const modules = await databaseConnector(newQuery, Object.values(teacher));

            teachersModules.push({ ...teacher, modules });

        }
        return teachersModules;
        
    } catch (error) {
        console.error('Erro ao verificar curso:', error);
        throw error;
    }
}
export default getTeachers;
