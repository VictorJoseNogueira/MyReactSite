import getTheCourseID from "./getCourseId.js";
import FindTheName from "./getTeachersId.js";
import getTheName from "./getNameById.js";

const getCourseTeachers = async (course) => {
    try {
        const courseID = await getTheCourseID(JSON.stringify(course));
        
        if (!courseID || courseID.length === 0) {
            throw new Error("Curso não encontrado no banco de dados.");
        }

        console.log("ID do curso encontrado:", courseID[0]);

        const teachers = await FindTheName(courseID[0].id_curso);
        
        if (!teachers || teachers.length === 0) {
            throw new Error("Nenhum professor encontrado para este curso.");
        }

        const teachersNames = await getTheName(teachers);
        return teachersNames;

    } catch (error) {
        throw new Error(error.message);
    }
};

export default getCourseTeachers;
