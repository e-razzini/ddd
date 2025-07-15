import Customer     from "../../customer/entity/customer";
import Order        from "../entity/order";
import OrderItem    from "../entity/order_item";
import OrderService from "./order.service";


describe("Order service",() =>{


    test("Order this new",() =>{

        const customer = new Customer("63746732","Marcos Sauro Junior");
        const item     = new OrderItem("76786347","item 001",30,"3247237646",2);

        const order = OrderService.place_order(customer,[item]);

        expect(customer.rewardPoints).toBe(15);
        expect(order.total_price()).toBe(30);
        


    });

    test("All order service",() => {

    
         const order_item_01 = new OrderItem("743783678643","Preco Desconto",120,"Notebook acer",2); 
         const order_item_02 = new OrderItem("743783678643","Preco Desconto",120,"Notebook",3); 
         
        const order_01  = new Order("02","Biricuto no fuba",[order_item_01]);
        const order_02  = new Order("03","Capivara do Metal",[order_item_02]);

        const total = OrderService.total([order_01,order_02]);
        expect(total).toBe(240);


    });

})