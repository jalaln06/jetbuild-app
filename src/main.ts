import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs'
import { TimeCheckInterceptor } from './TimeCheckInterceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.useGlobalInterceptors(new TimeCheckInterceptor());
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  app.setViewEngine('hbs')

  hbs.registerPartials(join(__dirname,'..',"views/partials"))
  await app.listen(process.env.PORT || 3020);
}
bootstrap();