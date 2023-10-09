import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configures SwaggerUI
  const config = new DocumentBuilder()
    .setTitle("Fantasy Football Insights API")
    .setDescription("The Fantasy Football Insights API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // get PORT from config
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT");

  // start application
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}/docs`);
}
bootstrap();
