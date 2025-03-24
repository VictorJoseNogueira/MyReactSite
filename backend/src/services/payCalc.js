import serviceOrdersDictionary from "./orders/allServices.js";
import getServiceOrdesFromDB from "./databasequerys/getServiceOrdesFromDB.js";
import HourLessonsOrder from "./orders/hourLessonsOrder.js";
import PackageModuleOrder from "./orders/modulePackageOrder.js";
import LessonOrder from "./orders/lessonsOrder.js";
import moduleOrder from "./orders/moduleOrder.js";

async function calculatePayment(teacherName, module, course) {
    const scriptForCalc = {
        1: HourLessonsOrder,
        2: HourLessonsOrder,
        3: LessonOrder,
        4: moduleOrder,
        5: PackageModuleOrder,
        6: LessonOrder,
        7: moduleOrder
    };

    try {
        const result = await getServiceOrdesFromDB(teacherName, course);
        const foundKey = Object.keys(serviceOrdersDictionary).find(
            key => serviceOrdersDictionary[key].id === result
        );

        if (foundKey) {
            const orderData = serviceOrdersDictionary[foundKey];
            const OrderClass = scriptForCalc[result];
            if (OrderClass) {
                const orderInstance = new OrderClass(orderData);
                orderInstance.setDetails(teacherName, module, course);
                await orderInstance.initializer();
                return orderInstance;
            } else {
                throw new Error(`No class found for result: ${result}`);
            }
        } else {
            throw new Error(`No order found for result: ${result}`);
        }
    } catch (error) {
        console.error("Erro ao calcular o pagamento:", error);
        throw error; // Propaga o erro para quem chamou a função
    }
}


// Example usage


export default calculatePayment;