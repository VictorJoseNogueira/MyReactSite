import ServiceOrder from './serviceOrder.js';

const serviceOrdersDictionary = {
    OS1: {
        id: 1,
        serviceName: "OS1", // Alterado de 'nomeServico' para 'serviceName'
        description: "Hora/aula", // Alterado de 'descricao' para 'description'
        value: 1000, // Alterado de 'valor' para 'value'
        teacherName: null, // Alterado de 'nomeProfessor' para 'teacherName'
        module: null, // Já está em inglês
        course: null, // Já está em inglês
        bonification: false, // Já está em inglês
        bonificationValue: 0 // Alterado de 'valorBonificacao' para 'bonificationValue'
    },
    OS2: {
        id: 2,
        serviceName: "OS2",
        description: "Hora/aula/bonus",
        value: 2000,
        teacherName: null,
        module: null,
        course: null,
        bonification: true,
        bonificationValue: 1000
    },
    OS3: {
        id: 3,
        serviceName: "OS3",
        description: "aula",
        value: 1500,
        teacherName: null,
        module: null,
        course: null,
        quantity: 1, // Alterado de 'quantidade' para 'quantity'
        bonification: true,
        bonificationValue: 500
    },
    OS4: {
        id: 4,
        serviceName: "OS4",
        description: "modulo",
        value: 5000,
        teacherName: null,
        module: null,
        course: null,
        quantity: 1,
        bonification: false,
        bonificationValue: 0
    },
    OS5: {
        id: 5,
        serviceName: "OS5",
        description: "pacote",
        value: 20000,
        teacherName: null,
        module: null,
        course: null,
        quantity: 3,
        bonification: false,
        bonificationValue: 0
    },
    OS6: {
        id: 6,
        serviceName: "OS6",
        description: "aula",
        value: 1500,
        teacherName: null,
        module: null,
        course: null,
        quantity: 1,
        bonification: false,
        bonificationValue: 0
    },
    OS7: {
        id: 7,
        serviceName: "OS7",
        description: "modulo",
        value: 5500,
        teacherName: null,
        module: null,
        course: null,
        quantity: 1,
        bonification: true,
        bonificationValue: 500
    }
};

export default serviceOrdersDictionary;