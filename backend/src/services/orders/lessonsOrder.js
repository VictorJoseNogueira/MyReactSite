import ServiceOrder from "./serviceOrder.js";

class LessonOrder extends ServiceOrder {
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
            paymentType: "quantia de aulas",
            value,
            teacherName,
            module,
            course,
            bonification,
            bonificationValue
        });
    }
}
export default LessonOrder
