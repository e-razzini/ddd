import Customer  from './domain/entity/customer';
import Address   from './domain/entity/address';
import OrderItem from './domain/entity/order_item';
import Order     from './domain/entity/order';

let customer   = new Customer("232128738273","Elton Patrik Razzini");
const address  = new Address("Rua Padre Antonio Eising","33","Brusque","Brasil");
customer.setAddress(address);
customer.activate();

const item_01 = new OrderItem("2732832873","Notebook",1999.90,"1518878",2);
const item_02 = new OrderItem("9834757857","Mouse Gamer",250.00,"14848944",4);
const ordem   = new Order("213422355","232128738273",[item_01,item_02]);
