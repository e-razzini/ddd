import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreateEvent   from "../customer-create.event";
// this is a handler for the CustomerCreateEvent that sends an email to the customer
export default class CreateCustomerHandler implements EventHandlerInterface<CustomerCreateEvent> {

    handle(event: CustomerCreateEvent): void {

        const {zip_code,street,city,country} = event.eventData.getAddress();
        console.log(`Create this customer ${event.eventData.id}, ${event.eventData.name},${zip_code} ,${street},${city},${country}`);
    }
}