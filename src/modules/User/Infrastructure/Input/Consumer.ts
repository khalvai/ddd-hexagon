import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller } from "@nestjs/common";
import { Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Consumer")
@Controller()
export class ConsumerController {
  @RabbitSubscribe({
    queue: "NewUserRegistered",
    exchange: "",
    createQueueIfNotExists: true,
  })
  onContentGenerated(@Payload() event: any) {
    console.log("processing event:", event);
  }
}
