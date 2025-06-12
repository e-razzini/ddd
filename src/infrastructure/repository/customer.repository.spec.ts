import { Sequelize }      from "sequelize-typescript";
import Address            from "../../domain/entity/address";
import Customer           from "../../domain/entity/customer";
import customerModel      from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("customers test",() =>{

        let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect:'sqlite',
                storage :':memory:',
                logging :false,
                sync:{force:true}
            });
    
             sequelize.addModels([customerModel]);
             await sequelize.sync();
        });
            
        afterEach(async() =>{
                await sequelize.close();
        }); 
    
        test("create a customer", async () => {
            
            const customer_repository  = new CustomerRepository();
    
            const customer   = new Customer("8979879789","Bryan conner");
            const address    = new Address("Rua dos Palmares","328","Florida","Estados Unidos da America");
            customer.setAddress(address);

            await customer_repository.create(customer);
            
            const  customer_model = await customerModel.findOne({where:{id:"8979879789"}});

            expect(customer_model.toJSON()).toStrictEqual({
                id:"8979879789",
                name:"Bryan conner",
                active:true,
                rewardPoints:0,
                zip_code:"328",
                city :"Florida",
                street:"Rua dos Palmares",
                country:"Estados Unidos da America"
            });
    
        });
    
        test("Update a customer", async ( ) =>{
    
            const customer_repository = new CustomerRepository();
            const customer   = new Customer("8979879789","Bryan conner");
            const address    = new Address("Rua dos Palmares","328","Florida","Estados Unidos da America");
            customer.setAddress(address);
            await customer_repository.create(customer);

            customer.changeName("Bryan o Conner");
            await customer_repository.updated(customer);
    
            const product_model_updated = await customerModel.findOne({where :{id:customer.id}});

            
            expect(product_model_updated.toJSON()).toStrictEqual({
                id:           customer.id,
                name:         customer.name,
                active:       customer.IsActive(),
                rewardPoints: customer.rewardPoints,
                zip_code:     customer.address.zip_code,
                city :        customer.address.city,
                street:       customer.address.street,
                country:      customer.address.country
            });
    
        });
    
    
        test("find a Product", async () => {
    
           const customer_repository = new CustomerRepository();

           const customer   = new Customer("287372213827","Joaquim Teixeira");
           const address    = new Address("Rua dos natchos","823","California","Estados Unidos da America");
           customer.setAddress(address);
           await customer_repository.create(customer);

           const customer_repository_result = await customerModel.findOne({where :{id:customer.id}});

           expect(customer_repository_result.toJSON()).toStrictEqual({
                   id:        customer.id,
                name:         customer.name,
                active:       customer.IsActive(),
                rewardPoints: customer.rewardPoints,
                zip_code:     customer.address.zip_code,
                city :        customer.address.city,
                street:       customer.address.street,
                country:      customer.address.country
           });
    
        });
    
        test.skip("find all Product", async () => {
    
           const prodRepository    = new CustomerRepository();
           const product           = new Customer("123","Mouse Logitecht");
           await prodRepository.create(product);
    
           const product_2   = new Customer("456","Mouse Asus");
           await prodRepository.create(product_2);

           const all_products = await prodRepository.find_all();
           const products     =[product,product_2];
           expect(products).toEqual(all_products);
    
        });
});