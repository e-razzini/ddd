import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory", () => {


    test("should create a customer", () => {

        const customer = CustomerFactory.create("John Doe");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
    });


    test("should create a customer with address",() =>{


        const address = new Address("123 Main St", "12345", "Anytown", "CA");   
        const customer = CustomerFactory.create_with_address("Jane Doe",address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jane Doe");
        expect(customer.address).toBe(address);

    });


});