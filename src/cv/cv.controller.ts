import {
  Body, CacheInterceptor, CacheKey, CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import * as faker from 'faker';
import { Reflector } from '@nestjs/core';
@Controller('cv')
// @UseInterceptors(CacheInterceptor)
export class CvController {
  constructor(
    private cvService: CvService,
    private reflector: Reflector
  ) {}

  @Get('faker')
  testFaker() {
    console.log('name example 👽' );
    return faker.name.name;
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey('cv.get.all')
  @CacheTTL(60 * 60 * 24)
  async getAllCvs(
    @User() user
  ): Promise<CvEntity[]> {
    return await this.cvService.getCvs(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() addCvDto: AddCvDto,
    @User() user
  ): Promise<CvEntity> {
    return await this.cvService.addCv(addCvDto, user);
  }


  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateCv2(
    @Body() updateObject,
    @User() user
  ) {
    const {updateCriteria, updateCvDto} = updateObject
    return await this.cvService.updateCv2(updateCriteria, updateCvDto);
  }

  // Chercher le nombre de cv par age
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async statsCvNumberByAge() {
    return await this.cvService.statCvNumberByAge(50,18);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restoreCv(
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ) {
    return await this.cvService.restoreCv(id, user);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getCv(
    @Param('id', ParseIntPipe) id,
    @User() user
  ): Promise<CvEntity> {
    return await this.cvService.findCvById(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCv(
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ) {
    return this.cvService.softDeleteCv(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateCvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto, user);
  }
}
