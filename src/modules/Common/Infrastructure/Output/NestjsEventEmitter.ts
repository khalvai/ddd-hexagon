import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Publisher } from "src/modules/Common/Application/Output/Publisher";

@Injectable()
export class NestjsEventPublisher implements Publisher {

    constructor(private eventEmitter: EventEmitter2) { }

    async publish(eventName: string, event: any): Promise<void> {
        console.log();

        await this.eventEmitter.emit(eventName, event)
        return
    }
}