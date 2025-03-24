import ServiceOrder from "./serviceOrder.js";
import getTime from "../databasequerys/getTime.js";

class HourLessonOrder extends ServiceOrder {
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
            paymentType: "Hora/aula",
            value,
            teacherName,
            module,
            course,
            bonification,
            bonificationValue
        });
        this.time = "00:00:00";
    }

    async initializer() {
        await this.init(); // Chama o init da classe filha
        this.totalAmount = await this.paymentAmount();
    }

    resetTime() {
        this.time = "00:00:00";
    }

    async init() {
        if (!this.teacherName || !this.module || !this.course) {
            this.time = "00:00:00";
            return;
        }
        try {
            this.time = await getTime(this.teacherName, this.module, this.course);
        } catch (error) {
            console.error("Erro ao calcular o tempo:", error);
            this.time = "00:00:00";
        }
    }

    getTimeCalculated() {
        return this.time;
    }

    async paymentAmount() {
        if (this.time === "00:00:00") return 0;
        const [hours, minutes, seconds] = this.time.split(':').map(Number);
        const totalHours = hours + minutes / 60 + seconds / 3600;
        let total = this.value * totalHours;
        if (this.bonification) total += this.bonificationValue;
        return total;
    }
}

export default HourLessonOrder;

