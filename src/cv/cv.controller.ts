import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('cv')
export class CvController {
  constructor(
    private cvService: CvService
  ) {

  }

  @Get()
  async getAllCvs(): Promise<CvEntity[]> {
    return await this.cvService.getCvs();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addCv(
    @Body() addCvDto: AddCvDto,
    @Req() req: Request
  ): Promise<CvEntity> {
    console.log('user from request', req.user);
    return await this.cvService.addCv(addCvDto);
  }


  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateCv2(
    @Body() updateObject
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
    @Param('id', ParseIntPipe) id: number) {
    HttpStatus
    return await this.cvService.restoreCv(id);
  }

  @Get(":id")
  async getCv(
    @Param('id', ParseIntPipe) id
  ): Promise<CvEntity> {
    return await this.cvService.findCvById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCv(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.cvService.softDeleteCv(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCv(
    @Body() updateCvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

}
