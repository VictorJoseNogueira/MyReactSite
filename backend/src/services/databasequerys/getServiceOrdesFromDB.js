import databaseConnector from "./dataBaseConector.js";



async function getServiceOrdesFromDB(teacher_name, course) {

const query = 
`
SELECT 
    t.id_teacher AS id_professor_tarefa, 
    p.id AS pid,
    p.nome,
    p.nome AS nome_professor, 
    p.service_order AS ordem_servico
FROM ${course} AS t
INNER JOIN professores AS p
ON t.id_teacher = p.id
WHERE teacher_name = ?
GROUP BY t.id_teacher, p.nome, p.service_order;
`;
try {
    // Executa a query com os parâmetros
    const result = await databaseConnector(query, [teacher_name]);

    if ((result[0].id_professor_tarefa == result[0].pid) && (result[0].nome_professor == result[0].nome)) {
        (result[0].ordem_servico)
        return result[0].ordem_servico;
    }

} catch (error) {
    console.error("Erro ao buscar ordens de serviço:", error);
    throw error; // Propaga o erro para quem chamou a função
}
}

export default getServiceOrdesFromDB