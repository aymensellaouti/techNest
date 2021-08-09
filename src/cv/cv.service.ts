import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CvEntity } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserService } from '../user/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '../config/events';
import {Cache} from 'cache-manager';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
    private userService: UserService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
  }

  async findCvById(id: number, user) {

    // const cacheId = `get.cv.${id}`;
    // console.log('in get cv by id wuth cache id', cacheId);
    // const cachedCv = await this.cacheManager.get(cacheId);
    // // if (cachedCv) {
    //   console.log('i get the cached cv',cachedCv);
    // // }
    const cv = await this.cvRepository.findOne(id);
    if(! cv) {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    }
    // Si on est admin ou si on est admin et on a pas de user
    if (this.userService.isOwnerOrAdmin(cv, user)) {
      // console.log('i am caching');
      // await this.cacheManager.set(`get.cv.${id}`, cv, {
      //   ttl: 10000000
      // });
      return cv;
    }
    else
      throw new UnauthorizedException();
  }
  async getCvs(user): Promise<CvEntity[]> {
    if (user.role === UserRoleEnum.ADMIN)
      return await this.cvRepository.find();
    return await this.cvRepository.find({user});
  }

  async addCv(cv: AddCvDto, user): Promise<CvEntity> {
    const newCv = this.cvRepository.create(cv);
    newCv.user = user;
    await this.cvRepository.save(newCv);
    // await this.mailService.addedCvMail();
    this.eventEmitter.emit(EVENTS.CV_ADD, {
      name: newCv.name
    });
    return newCv;
  }

  async updateCv(id: number, cv: UpdateCvDto, user): Promise<CvEntity> {
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
   if (this.userService.isOwnerOrAdmin(newCv, user))
      return await this.cvRepository.save(newCv);
    else
      new UnauthorizedException('');
  }

  updateCv2(updateCriteria, cv: UpdateCvDto ) {
    return this.cvRepository.update(updateCriteria, cv);
  }

  // async removeCv(id: number) {
  //   const cvToRemove = await this.findCvById(id);
  //   return await this.cvRepository.remove(cvToRemove);
  // }

  async softDeleteCv(id: number, user) {
    const cv = await this.cvRepository.findOne({id});
    console.log('cv', cv);
    if (!cv) {
      throw new NotFoundException('');
    }
    if (this.userService.isOwnerOrAdmin(cv, user))
      return this.cvRepository.softDelete(id);
    else
      throw new UnauthorizedException('');
  }

  async restoreCv(id: number, user) {

    const cv = await this.cvRepository.query("select * from cv where id = ?", [id]);
    if (!cv) {
      throw new NotFoundException('');
    }
    if (this.userService.isOwnerOrAdmin(cv, user))
      return this.cvRepository.restore(id);
    else
      throw new UnauthorizedException('');
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
