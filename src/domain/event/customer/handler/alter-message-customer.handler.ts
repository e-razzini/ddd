import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreateEvent   from "../customer-create.event";
// this is a handler for the CustomerCreateEvent that sends an email to the customer
export default class AlteredCustomerHandler implements EventHandlerInterface<CustomerCreateEvent> {

    handle(event: CustomerCreateEvent): void {
         const {zip_code,street,city,country} = event.eventData.getAddress();
        console.log(`Altered this customer ${event.eventData.id}, ${event.eventData.name},${zip_code} ,${street},${city},${country}`);
    }
}