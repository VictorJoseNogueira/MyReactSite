import ServiceOrder from "./serviceOrder.js";
import getModuleQty from "../databasequerys/getModuleQty.js";

class PackageModuleOrder extends ServiceOrder {
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
            paymentType: "pacote de modulos",
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
            this.qty = await getModuleQty(this.teacherName,this.course);
        } catch (error) {
            console.error("Erro ao calcular a quantidade:", error);
            this.qty = 0; // Define um valor padrão em caso de erro
        }
    }
}


export default PackageModuleOrder
