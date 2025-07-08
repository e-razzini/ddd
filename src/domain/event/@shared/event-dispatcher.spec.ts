import EventDispatcher from "./event-dispatcher";
import SendEmailCustomerHandler from "../customer/handler/send-mail-customer.handler";
import CustomerCreateEvent from "../customer/customer-create.event";

import SendEmailProductHandler from "../product/handler/send-email-product.handler";
import ProductCreateEvent from "../product/product-create.event";   

describe("Dominio de Eventos - EventDispatcher", () => {



       test.skip("Register evento handler",() =>{

           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"].length).toBe(1);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"][0]).toMatchObject(eventHandler);
       });

       test.skip("Unregister evento handler",() =>{
           
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"].length).toBe(1);
           
           // Unregistering the event handler this class name
           eventDispatcher.unregister("SendEmailCustomerHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"].length).toBe(0);
           
       });

       test.skip("Unregister all event handlers",() =>{
           
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"].length).toBe(1);
           
           // Unregistering all event handlers
           eventDispatcher.unregisterAll();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"]).toBeUndefined();
           
       });  


       test.skip("Notify event handler",() =>{
           
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerHandler();
           const spy = jest.spyOn(eventHandler, "handle");
           
           // Registering the event handler this class name
           eventDispatcher.register("CustomerCreateEvent", eventHandler);
           expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(eventHandler);


           // customer
           const customerCreateEvent = new CustomerCreateEvent({
            name :"Customer 1",
            describe: "Customer 1 description",
            email:"customer@gmail.com.br"
           })
           
           // Notify the event handler
           eventDispatcher.notify(customerCreateEvent);
           expect(spy).toHaveBeenCalled();
           
       });  

       test("Register event product handler",() =>{

           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailProductHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("ProductCreateEvent", eventHandler);
           expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(1);
           expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);


       });

       test("Unregister event product handler",() =>{


          const eventDispatcher = new EventDispatcher();
          const eventHandler    = new SendEmailProductHandler();        

            // Registering the event handler this class name    
            eventDispatcher.register("SendEmailProductHandler", eventHandler);
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"]).toBeDefined();
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"].length).toBe(1);

            eventDispatcher.unregister("SendEmailProductHandler", eventHandler);
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"].length).toBe(0);



       });

       test("Unregister all event product handlers",() =>{

          const eventDispatcher = new EventDispatcher();
          const eventHandler    = new SendEmailProductHandler();        

            // Registering the event handler this class name    
            eventDispatcher.register("SendEmailProductHandler", eventHandler);
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"]).toBeDefined();
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"].length).toBe(1);

            // Unregistering all event handlers
            eventDispatcher.unregisterAll();
            expect(eventDispatcher.getEventHandlers["SendEmailProductHandler"]).toBeUndefined();

       });
    
       test("Notify event product handler",() =>{

          const eventDispatcher = new EventDispatcher();
          const eventHandler    = new SendEmailProductHandler();
          const spy = jest.spyOn(eventHandler, "handle");

          // Registering the event handler this class name
          eventDispatcher.register("ProductCreateEvent", eventHandler);
          expect(eventDispatcher.getEventHandlers["ProductCreateEvent"][0]).toMatchObject(eventHandler);

          // product
          const productCreateEvent = new ProductCreateEvent({
            name :"Product 1",
            describe: "Product 1 description",
            price: 100
          });

            // Notify the event handler
            eventDispatcher.notify(productCreateEvent);
            expect(spy).toHaveBeenCalled();


        });
});