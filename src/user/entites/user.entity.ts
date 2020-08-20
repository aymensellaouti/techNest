import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../Generics/timestamp.entites.';
import { CvEntity } from '../../cv/entities/cv.entity';

@Entity('user')
export class UserEntity extends TimestampEntites{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @OneToMany(
    type => CvEntity,
    (cv) => cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
  cvs: CvEntity[];
}
