import { Controller, Put, Get, Body, UseGuards } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionDto } from './dto/option.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  /**
   * 更新配置
   */
  @UseGuards(AuthGuard())
  @Put()
  update(@Body() dto: OptionDto) {
    return this.optionService.updateOption(dto);
  }

  /**
   * 返回配置
   */
  @Get()
  find() {
    return this.optionService.findOneOption();
  }
}
