import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Repository } from 'typeorm';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeliveryService {
  constructor(
    // Inject the DeliveryRepository
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    createDeliveryDto.name = createDeliveryDto.name.toLowerCase();
    // Create a new delivery
    const delivery = this.deliveryRepository.create(createDeliveryDto);

    // Save the delivery to the database
    return await this.deliveryRepository.save(delivery);
  }

  findAll() {
    return this.deliveryRepository.find();
  }

  async findOne(id: string) {
    const delivery = await this.deliveryRepository.findOne({
      where: { id },
    });

    if (!delivery) throw new BadRequestException('Delivery not found');

    return delivery;
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return `This action updates a #${id} delivery`;
  }

  remove(id: number) {
    return `This action removes a #${id} delivery`;
  }

  async deleteAll() {
    try {
      await this.deliveryRepository.delete({});
    } catch (error) {
      console.log(error);
    }
  }
}
