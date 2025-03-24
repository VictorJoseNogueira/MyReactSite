import ServiceOrder from "./serviceOrder.js";
import getModulewhenCompleted from "../databasequerys/getModuleWhenCompleted.js";

class moduleOrder extends ServiceOrder {
    constructor({
        id,
        serviceName,
        value,
        teacherName = null,
        module = null,
        course = null,
        bonification = false,
        bonificationValue = null
    }) {
        super({
            id,
            serviceName,
            paymentType: "modulos",
            value,
            teacherName,
            module,
            course,
            bonification,
            bonificationValue
        });
    }

    async init() {
        if (!this.teacherName || !this.module || !this.course) {
            this.qty = 0;
            return;
        }
        try {
            const completed = getModulewhenCompleted(this.teacherName, this.module, this.course);
            if(completed){
                this.qty = 1;
            }
            else{
                this.qty = 0;	
            }
        } catch (error) {
            console.error("Erro ao calcular a quantidade:", error);
            this.qty = 0; // Define um valor padrão em caso de erro
        }
    }

}
export default moduleOrder
