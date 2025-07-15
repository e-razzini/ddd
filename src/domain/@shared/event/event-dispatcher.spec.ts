import EventDispatcher          from "./event-dispatcher";
import SendEmailCustomerHandler from "../../customer/event/handler/send-mail-customer.handler";
import CreateCustomerHandler    from "../../customer/event/handler/create-message-customer.handler";
import AlteredCustomerHandler   from "../../customer/event/handler/alter-message-customer.handler";

import CustomerCreateEvent      from "../../customer/event/customer-create.event";
import CustomerAlteredEvent     from "../../customer/event/customer-altered.event";

import SendEmailProductHandler        from "../../product/event/handler/send-email-product.handler";
import ProductCreateEvent             from "../../product/event/product-create.event";   
import SendEmailCustomerFriendHandler from "../../customer/event/handler/send-message-friend-customer.handler";

import Customer from "../../customer/entity/customer";
import Address  from "../../customer/value-object/address"; 

describe("Dominio de Eventos - EventDispatcher", () => {

       test("Register evento handler",() =>{

           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"].length).toBe(1);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerHandler"][0]).toMatchObject(eventHandler);
       });
       test("Unregister evento handler",() =>{
           
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
       test("Unregister all event handlers",() =>{
           
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
       test("Notify event handler",() =>{
           
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
       test("Register send message friend customer handler", () => {
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerFriendHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerFriendHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"].length).toBe(1);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"][0]).toMatchObject(eventHandler);
       });  
       test("Unregister send message friend customer handler", () => {
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerFriendHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerFriendHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"].length).toBe(1);
           
           // Unregistering the event handler this class name
           eventDispatcher.unregister("SendEmailCustomerFriendHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"].length).toBe(0);
       });  
       test("Unregister all send message friend customer handlers", () => {
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new SendEmailCustomerFriendHandler();
           
           // Registering the event handler this class name
           eventDispatcher.register("SendEmailCustomerFriendHandler", eventHandler);
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"]).toBeDefined();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"].length).toBe(1);
           
           // Unregistering all event handlers
           eventDispatcher.unregisterAll();
           expect(eventDispatcher.getEventHandlers["SendEmailCustomerFriendHandler"]).toBeUndefined();
       });      
       test("Notify send message friend customer handler", () => {
           const eventDispatcher       = new EventDispatcher();
           const eventHandler          = new SendEmailCustomerFriendHandler();
           const spy_send_email_friend = jest.spyOn(eventHandler, "handle");
           
           // Registering the event handler this class name
           eventDispatcher.register("CustomerCreateEvent", eventHandler);
           expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(eventHandler);

           // customer
            const customerCreateEvent = new CustomerCreateEvent({
            name :"Customer 1",
            describe: "Customer 1 description",
            email_friend:"myfrient@gmail.com.br"});
            
            // Notify the event handler       
             eventDispatcher.notify(customerCreateEvent);  
               expect(spy_send_email_friend).toHaveBeenCalled();           
       });

       test("Notify  create customer handler with no event handlers", () => {
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new CreateCustomerHandler();
           const spy = jest.spyOn(eventHandler, "handle");
           
           // Registering the event handler this class name
           eventDispatcher.register("CustomerCreateEvent", eventHandler);
           expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(eventHandler);

            // customer
            const customer = new Customer('1', 'Customer 1 ');
            const address  = new Address('Rua 1', '123', 'Bairro 1','Estado 1');
            customer.setAddress(address);

            const customerCreateEvent = new CustomerCreateEvent(customer);
            eventDispatcher.notify(customerCreateEvent);
            expect(spy).toHaveBeenCalled();
     
            const eventHandler_2    = new AlteredCustomerHandler();
            // Registering the event handler this class name
           eventDispatcher.register("CustomerCreateEvent", eventHandler_2);
           expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(eventHandler_2);

            const address_2  = new Address('Rua 2','32443', 'Bairro 2','Estado2');
            customer.setAddress(address_2);

            const customerAlteredEvent = new CustomerAlteredEvent(customer);
            eventDispatcher.notify(customerAlteredEvent);
            expect(spy).toHaveBeenCalled();

        });    
       
        test("Notify  altered customer handler with no event handlers", () => {
           const eventDispatcher = new EventDispatcher();
           const eventHandler    = new CreateCustomerHandler();

           const alteredEventHandler  = new AlteredCustomerHandler();
           const spy = jest.spyOn(alteredEventHandler, "handle");
           
           // Registering the event handler this class name
           eventDispatcher.register("CustomerCreateEvent", eventHandler);
           expect(eventDispatcher.getEventHandlers["CustomerCreateEvent"][0]).toMatchObject(eventHandler);
           // customer
           const customer = new Customer('1', 'Customer 1 ');
           const address  = new Address('Rua 1', '123', 'Bairro 1','Estado 1');
           customer.setAddress(address);
           const customerCreateEvent = new CustomerCreateEvent(customer);
           eventDispatcher.notify(customerCreateEvent);
                  
            // Registering the event handler this class name
           eventDispatcher.register("CustomerAlteredEvent", alteredEventHandler);
           expect(eventDispatcher.getEventHandlers["CustomerAlteredEvent"][0]).toMatchObject(alteredEventHandler);

            const address_2  = new Address('Rua 2','32443', 'Bairro 2','Estado2');
            customer.setAddress(address_2);

            const customerAlteredEvent = new CustomerAlteredEvent(customer);
            eventDispatcher.notify(customerAlteredEvent);
            expect(spy).toHaveBeenCalled();
        });   

});