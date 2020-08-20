import { Injectable, NotFoundException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>
  ) {
  }

  async findCvById(id: number) {
    const cv = await this.cvRepository.findOne(id);
    if(! cv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
    return cv;
  }
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }

  async updateCv(id: number, cv: UpdateCvDto): Promise<CvEntity> {
    //On récupére le cv d'id id et ensuite on remplace les anciennes valeurs de ce cv
    // par ceux du cv passé en paramètre
    const newCv = await this.cvRepository.preload({
      id,
      ...cv
    });
    // tester le cas ou le cv d'id id n'existe pas
    if(! newCv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
    //sauvgarder la nouvelle entité donc le nouveau cv
    return await this.cvRepository.save(newCv);
  }

  updateCv2(updateCriteria, cv: UpdateCvDto ) {
    return this.cvRepository.update(updateCriteria, cv);
  }

  async removeCv(id: number) {
    const cvToRemove = await this.findCvById(id);
    return await this.cvRepository.remove(cvToRemove);
  }

  async softDeleteCv(id: number) {
    return this.cvRepository.softDelete(id);
  }

  async restoreCv(id: number) {
    this.cvRepository.restore(id);
  }

  async deleteCv(id: number) {
    return await this.cvRepository.delete(id);
  }

  async statCvNumberByAge(maxAge, minAge = 0) {
    // Créer un queryBuilder
    const qb = this.cvRepository.createQueryBuilder("cv");
    // Chercher le nombre de cv par age
      qb.select("cv.age, count(cv.id) as nombreDeCv")
      .where("cv.age > :minAge and cv.Age< :maxAge")
      .setParameters({minAge, maxAge})
      .groupBy("cv.age");
      console.log(qb.getSql());
      return await qb.getRawMany();
  }
}
