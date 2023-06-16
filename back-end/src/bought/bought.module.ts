import { Module } from '@nestjs/common';
import { BoughtService } from './bought.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bought from './Bought.entity';
import { BoughtController } from './bought.controller';
import Users from 'src/users/users.entity';
import Products from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bought, Users, Products])],
  providers: [BoughtService],
  controllers: [BoughtController],
})
export class BoughtModule {}
