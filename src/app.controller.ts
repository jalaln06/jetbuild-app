import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'
import { TimeCheckInterceptor } from './TimeCheckInterceptor';
@UseInterceptors  (TimeCheckInterceptor)
@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  @Get('regpage')
  @Render('regpage.hbs')
  getReg(){
    return {user:7232183}
  }
  @Get('regpagebad')
  @Render('regpage.hbs')
  getRegUn(){
    return {}
  }
}
