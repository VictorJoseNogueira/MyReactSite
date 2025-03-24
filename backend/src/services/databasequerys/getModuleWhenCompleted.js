import databaseConnector from "./dataBaseConector.js";

async function getModulewhenCompleted(teacher_name, module, course) {
    if (!teacher_name || !module || !course) {
        return 0;
    }else{

        const query = `
        SELECT 
            COUNT(
                CASE 
                    WHEN status_aula IN ('Gravado', 'Editado') 
                    THEN 1 
                END
            ) AS module_record,
            COUNT(*) AS total_module
        FROM ${course}
        WHERE teacher_name = ? 
        AND module = ?;
        `;
        const result = await databaseConnector(query, [teacher_name, module]);
        if (result[0].module_record == result[0].total_module) {
            return true;
        }

        return ;
    }
}

export default getModulewhenCompleted
