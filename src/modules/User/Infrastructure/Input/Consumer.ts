import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { OnEvent } from "@nestjs/event-emitter";
import { ApiTags } from "@nestjs/swagger";
import Result from "src/modules/Common/Application/Result";
import { SendVerificationEmailCommand } from "src/modules/User/Application/Commands/SendVerificationEmailCommand";
import NewUserRegistered from "src/modules/User/Domain/Events/Integration/NewUserRegistered";

@ApiTags("Consumer")
@Controller()
export class Consumer {

  public constructor(private commandBus: CommandBus) { }


  @OnEvent('NewUserRegistered')
  async onUserRegistered(event: any) {

    console.log(event);

    const result = this.commandBus.execute<SendVerificationEmailCommand, Result<void>>(new SendVerificationEmailCommand(event.email, event.name, event.userId, event.ip))

    if ("failure" in result) {
      throw result.failure
    }


  }

}
