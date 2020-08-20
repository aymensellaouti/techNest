import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

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
  async addCv(
    @Body() addCvDto: AddCvDto
  ): Promise<CvEntity> {
    return await this.cvService.addCv(addCvDto);
  }


  @Patch()
  async updateCv2(
    @Body() updateObject
  ) {
    const {updateCriteria, updateCvDto} = updateObject
    return await this.cvService.updateCv2(updateCriteria, updateCvDto);
  }

  // Chercher le nombre de cv par age
  @Get('stats')
  async statsCvNumberByAge() {
    return await this.cvService.statCvNumberByAge(50,18);
  }

  @Get('recover/:id')
  async restoreCv(
    @Param('id', ParseIntPipe) id: number) {
    return await this.cvService.restoreCv(id);
  }

  @Get(":id")
  async getCv(
    @Param('id', ParseIntPipe) id
  ): Promise<CvEntity> {
    return await this.cvService.findCvById(id);
  }

  @Delete(':id')
  async deleteCv(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.cvService.softDeleteCv(id);
  }

  @Patch(':id')
  async updateCv(
    @Body() updateCvDto: UpdateCvDto,
    @Param('id', ParseIntPipe) id: number
  ): Promise<CvEntity> {
    return await this.cvService.updateCv(id, updateCvDto);
  }

}
