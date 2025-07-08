import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreateEvent   from "../product-create.event";

export default class SendEmailProductHandler implements EventHandlerInterface<ProductCreateEvent> {
    handle(event: any): void {
        console.log(`Sending email to ${event.eventData.email}...`);
    }
}
