import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('applications')
export class ApplicationsController {
  // 获取所有应用
  @Get()
  findAll(): string {
    return 'This action returns all applications';
  }
  // 获取应用：id
  @Get(':id') //http://127.0.0.1:3000/applications/1
  findById(@Param('id') id): string {
    console.log(id);
    return 'This action returns a #application which id was' + id;
  }
  // 创建应用
  @Post()
  create(@Body() body: any): string {
    console.log(body);
    return 'This action adds a new #application';
  }
}
