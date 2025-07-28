import {v4 as uuid} from "uuid";
import OrderFactory from "./order.factory";

describe("Order Factory", () => {

    it("should create an order with valid data", () => {
   
        const orderPros ={
            id:uuid(),
            customerId: uuid(),
            items: [
                { id: uuid(),
                    name: "Product 1", 
                    price: 100 ,
                    productId:uuid(), 
                    quantity: 2
                },
            ]
        }

        const order = OrderFactory.create(orderPros);   
        expect(order.id).toBe(orderPros.id);
        expect(order.customer_id).toEqual(orderPros.customerId);
        expect(order.items.length).toBe(1);
        
    })
      
});