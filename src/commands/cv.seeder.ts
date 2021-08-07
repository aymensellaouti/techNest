import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import * as faker from 'faker';
import { UserRoleEnum } from '../enums/user-role.enum';
import { CvEntity } from '../cv/entities/cv.entity';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  faker.local = 'fr';
  const userService = app.get(UserService);
  const users = await userService.findAll({role: UserRoleEnum.USER});
  for (let i = 1; i < 10 ; i++) {
    const newCv = new CvEntity();
    newCv.firstname = faker.name.firstName();
    newCv.name = faker.name.lastName();
    newCv.job = faker.name.jobTitle();
    newCv.cin = faker.random.number();
    newCv.age = faker.random.number()%60;
    newCv.path = '';
    console.log('the new cv to add',newCv);
    const user = users[Math.floor(Math.random() * users.length)];
    await cvService.addCv(newCv, user);
  }
  await app.close();
}
bootstrap();
