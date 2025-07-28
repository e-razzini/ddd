import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";


export default class CustomerFactory  {

    public static create(name: string): Customer {

        if (!name) {
            throw new Error("Nome e email são obrigatórios.");
        }
        
        const id = uuid();
        return new Customer(id, name);
    }
    public static create_with_address(name: string,address:Address): Customer {

        if (!name) {
            throw new Error("Nome e email são obrigatórios.");
        }
        
        const id = uuid();
        const customer = new Customer(id, name);
        customer.setAddress(address);
        return customer;
    }
}