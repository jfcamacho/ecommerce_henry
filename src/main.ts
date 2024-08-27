import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/loggerGlobal.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerGlobal)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map(err => {
        return {property: err.property, constraints: err.constraints}
      });
      return new BadRequestException({
        alert: 'Se han detectado los siguientes errores en la petición: ',
        errors: cleanErrors
      })
    }
  }))

  const swaggerConfig = new DocumentBuilder()
  .setTitle('App ecommerce')
  .setDescription('Esta es una aplicación diseñada para probar los diferentes niveles de ejecución de una app validando rutas, interceptores, guards, etc')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
