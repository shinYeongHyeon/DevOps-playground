import { EntityRepository, Repository } from 'typeorm';
import { ShopEntity } from '../Shop.entity';

@EntityRepository(ShopEntity)
export class ShopRepository extends Repository<ShopEntity> {}