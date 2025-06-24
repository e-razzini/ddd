import { Sequelize }      from "sequelize-typescript";
import OrderItemModel     from "../db/sequelize/model/order-item.model";
import ProductModel       from "../db/sequelize/model/product.model";

import customerModel      from "../db/sequelize/model/customer.model";
import Address            from "../../domain/entity/address";
import Customer           from "../../domain/entity/customer";
import Product            from "../../domain/entity/product";
import OrderItem          from "../../domain/entity/order_item";
import CustomerRepository from "./customer.repository";
import Order              from "../../domain/entity/order";
import ProductRepository  from "./product.repository";
import OrderRepository    from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository test",() =>{

        let sequelize: Sequelize;
    
        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect:'sqlite',
                storage :':memory:',
                logging :false,
                sync:{force:true}
            });
    
             sequelize.addModels([customerModel,OrderModel,OrderItemModel,ProductModel]);
             await sequelize.sync();
        });
            
        afterEach(async() =>{
                await sequelize.close();
        }); 
    
        test.skip("create a Order", async () => {

            const customer_repository = new CustomerRepository(); 
            const customer  = new Customer("21478614638","Capivara do Heave METAaaAAaaAAaAAaaL");
            const address   = new Address("Rua do Virgilho","328","Sao Gonçalo","Brasil")
            customer.setAddress(address);
            await customer_repository.create(customer);

            const product_repository = new ProductRepository();
            const product = new Product("3215327536721","Notebook AVEL 2036",15000.00)
            await product_repository.create(product);

            const orderItem = new OrderItem("276214875498",product.describle,product.price,product.id,2);

            const order_repositore =new OrderRepository();
            const order  = new Order("2763213",customer.id,[orderItem]);
            await order_repositore.create(order);

            const order_model = await OrderModel.findOne({
                where :{
                    id:"2763213"
                } ,
                include:["items"],
            });

            expect(order_model.toJSON()).toStrictEqual({
                customer_id    : customer.id,
                id             : order.id,
                total          : order.total,
                items:[{
                    id         :orderItem.id,
                    name       :orderItem.name,
                    quantity   :orderItem.quantity,
                    order_id   :order.id,
                    product_id :product.id,
                    price      :orderItem.price,
                   
                 }
                ]
            })
    
        });
    
        test("Update a order", async ( ) =>{
    
            const customer_repository = new CustomerRepository(); 
            const customer  = new Customer("21478614638","Capivara do Heave METAaaAAaaAAaAAaaL");
            const address   = new Address("Rua do Virgilho","328","Sao Gonçalo","Brasil");
            customer.setAddress(address);
            await customer_repository.create(customer);

            const address_novo = new Address("Rua do Virgilho","328","Sao Gonçalo","Brasil");

            customer.setAddress(address_novo);

            const product_repository = new ProductRepository();
            const product = new Product("3215327536721","Notebook AVEL 2036",15000.00)
            await product_repository.create(product);

            const orderItem = new OrderItem(customer.id,product.describle,product.price,product.id,2);

            const order_repositore =new OrderRepository();
            const order  = new Order("2763213",customer.id,[orderItem]);
            await order_repositore.create(order);
    
            const order_model = await OrderModel.findOne({
                where :{id: order.id},
                include:["items"],
            });

            
            expect(order_model.toJSON()).toStrictEqual({
                customer_id:  customer.id,
                id:           order.id,
                total:        order.total,
                items:[{
                    id         :orderItem.id,
                    name       :orderItem.name,
                    quantity   :orderItem.quantity,
                    order_id   :order.id,
                    product_id :product.id,
                    price      :orderItem.price,
                   
                 }
                ]
            });

            const orderItem_02 =new OrderItem(customer.id,product.describle,product.price,product.id,3);
            const order_2  = new Order("2763213",customer.id,[orderItem_02]);
            await order_repositore.updated(order_2);


            const order_model_2 = await OrderModel.findOne({
                where :{id: order_2.id},
                include:["items"],
            });


            expect(order_model_2.toJSON()).toStrictEqual({
                customer_id:  customer.id,
                id:           order.id,
                total:        order_2.total,
                items:[{
                    id         :orderItem_02.id,
                    name       :orderItem_02.name,
                    quantity   :orderItem_02.quantity,
                    order_id   :order_2.id,
                    product_id :product.id,
                    price      :orderItem_02.price,
                   
                 }
                ]
            });
        });
    
    
        test.skip("find a Product", async () => {
    
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
