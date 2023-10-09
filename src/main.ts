import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  // configures SwaggerUI
  const config = new DocumentBuilder()
    .setTitle("Fantasy Football Insights API")
    .setDescription("The Fantasy Football Insights API")
    .setVersion("1.0")
    .addOAuth2(
      {
        type: "oauth2",
        flows: {
          password: {
            tokenUrl: "/api/v1/login",
            scopes: {},
          },
        },
      },
      "Authentication"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: "http://localhost:3000/api/oauth2-redirect.html",
      persistAuthorization: true,
      initOAuth: {
        clientSecret: "secretKey",
        appName: "Fantasy Football Insights API",
      },
    },
  });

  // get PORT from config
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT");

  // start application
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
  console.log(`View the API Documentation at: http://localhost:${PORT}/docs`);
}
bootstrap();
