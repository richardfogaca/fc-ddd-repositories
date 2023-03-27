import EventInterface from "../../../interfaces/event.interface";

export default class AddressChangedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date();
        this.eventData = eventData;
    }
}
