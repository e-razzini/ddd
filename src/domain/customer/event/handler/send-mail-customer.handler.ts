import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreateEvent   from "../customer-create.event";
// this is a handler for the CustomerCreateEvent that sends an email to the customer
export default class SendEmailCustomerHandler implements EventHandlerInterface<CustomerCreateEvent> {

    handle(event: CustomerCreateEvent): void {
        console.log(`Sending email to ${event.eventData.email}...`);
    }
}