import getQty from "../databasequerys/getQty.js";

class ServiceOrder {
    constructor({
        id = null, 
        serviceName = null, 
        paymentType = null, 
        value = null, 
        teacherName = null, 
        module = null, 
        course = null, 
        bonification = false, 
        bonificationValue = null
    }) { 
        this.id = id;                            
        this.serviceName = serviceName;         
        this.paymentType = paymentType;         
        this.value = value;
        this.teacherName = teacherName;         
        this.module = module;                   
        this.course = course;                                
        this.bonification = bonification;       
        this.bonificationValue = bonificationValue; 
        this.qty = 0; // Inicializa com 0 ou outro valor padrão
        this.totalAmount = 0; // Inicializa com 0 ou outro valor padrão
    }
    
    async initializer() {
        await this.init();
        this.totalAmount = await this.paymentAmount();
    }

    setId(id) { this.id = id; }
    setServiceName(serviceName) { this.serviceName = serviceName; }
    setPaymentType(paymentType) { this.paymentType = paymentType; }
    setValue(value) { this.value = value; }

    async init() {
        if (!this.teacherName || !this.module || !this.course) {
            this.qty = 0;
            return;
        }
        try {
            
            this.qty = await getQty(this.teacherName, this.module, this.course);
        } catch (error) {
            console.error("Erro ao calcular a quantidade:", error);
            this.qty = 0; // Define um valor padrão em caso de erro
        }
    }

    resetQty() {
        this.qty = 0; 
    }

    async setDetails(teacherName, module, course) {
        this.teacherName = teacherName;
        this.module = module;
        this.course = course;
        this.resetQty();
    }
    

    setBonification(bonification) { this.bonification = bonification; }
    setBonificationValue(bonificationValue) { this.bonificationValue = bonificationValue; }

    paymentAmount() {
        return this.bonification ? this.value * this.qty + this.bonificationValue : this.value * this.qty;
    }
}

export default ServiceOrder;
