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
    
        test("create a Order", async () => {

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
    
    
        test("find a order", async () => {
    
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
            });

            
    
        });
    
        test("find all Product", async () => {
    
            const customer_repository = new CustomerRepository(); 
            const product_repository  = new ProductRepository();
            const order_repositore    = new OrderRepository();

            const customer  = new Customer("21478614638","Capivara do Heave METAaaAAaaAAaAAaaL");
            const address   = new Address("Rua do Virgilho","328","Sao Gonçalo","Brasil");
            customer.setAddress(address);
            await customer_repository.create(customer);

            const product = new Product("3215327536721","Notebook AVEL 2036",1500.00)
            await product_repository.create(product);
            
            const orderItem = new OrderItem("276214875498",product.describle,product.price,product.id,2);
            
            const order  = new Order("2763213",customer.id,[orderItem]);
            await order_repositore.create(order);
            
            const customer_1  = new Customer("214786146382313","Capivara do Heave METAaaAAaaAAaAAaaL");
            const address_1   = new Address("Rua do Matagal","328","Sao Gonçalo","Brasil");
            customer_1.setAddress(address_1);
            await customer_repository.create(customer_1);
            
            const product_1 = new Product("312","Notebook AVEL 1036",4500.00)
            await product_repository.create(product_1);
            
            const orderItem_1 = new OrderItem("27613213214875498",product_1.describle,product_1.price,product_1.id,2);
            
            const order_1  = new Order("3214323",customer_1.id,[orderItem_1]);
            await order_repositore.create(order_1);


           const all_order_repository     =  await order_repositore.find_all();
           const all_ordens     =[order,order_1];


           expect(all_order_repository).toEqual(all_ordens);
    
        });
});
