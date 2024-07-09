import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getThemeAsync } from '@intelika/swagger-theme';
import simpleGit from 'simple-git';

export async function setupDocument(app: INestApplication, route: string) {
    const git = simpleGit({
        baseDir: process.cwd(),
        binary: 'git'
    });

    const lastCommitFromLocal = await git.log(['-1']);

    // @ts-ignore
    const { date, author_name, message } = lastCommitFromLocal.latest;
    const updatedAt = new Date(date).toUTCString();

    const description = [`🍕  documentation`];

    description.push(`📅 Updated: <b>${updatedAt}</b>`);
    description.push(`👤 Last commit by  <b>${author_name}</b>`);
    description.push(`📝 Summary: <i>${message}</i>`);

    const configDocument = new DocumentBuilder()
        .setTitle('DDD Hexagonal')
        .setDescription(description.join('\r\n\r\n'))
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'Bearer',
            bearerFormat: 'JWT'
        })
        .build();

    const document = SwaggerModule.createDocument(app, configDocument);
    const style: Buffer = await getThemeAsync();
    SwaggerModule.setup(route, app, document, {
        customCss: style.toString()
    });
}
