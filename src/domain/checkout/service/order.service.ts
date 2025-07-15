import Customer from  "../../customer/entity/customer";
import Order from     "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid"

export default class OrderService {

    static total(order:Order[]): number {
       return order.reduce((acumulador,item)=> acumulador + item.total_price() ,0)
    }


    static place_order(customer:Customer,item:OrderItem[]): Order {

        if(item.length ==0){
           throw new Error("Não tem item em sua lista");
        }
        
        const order = new Order(uuid(),customer.id,item);
        customer.AddRewardPoints(order.total_price() / 2);
        return order;
    }
}