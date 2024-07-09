import { Logger, Module } from '@nestjs/common';
import { PrismaModule as _PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import chalk from 'chalk';
import PrismaService from 'src/modules/User/Infrastructure/Output/Persistence/PrismaService';

@Module({
    imports: [
        _PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                middlewares: [
                    loggingMiddleware({
                        logger: new Logger('PrismaMiddleware'),
                        logLevel: 'log', // default is `debug`
                        logMessage: (query: QueryInfo) =>
                            `${chalk.blueBright('[Prisma Query]')} ${chalk.yellowBright(query.model)}.${chalk.yellowBright(query.action)} - ${chalk.magentaBright(query.executionTime)}ms`
                    })
                ],
                prismaOptions: {
                    log: ['error', 'info'],
                    errorFormat: 'pretty'
                },
                explicitConnect: true
            }
        }),

    ],
    providers: [PrismaService],
    exports: [PrismaService],
})
export default class PrismaModule { }