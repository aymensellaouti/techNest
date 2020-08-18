import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { TimestampEntites } from '../../Generics/timestamp.entites.';


@Entity('cv')
export class CvEntity extends TimestampEntites {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50
  })
  name: string;

  @Column({
    length: 50
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

}
