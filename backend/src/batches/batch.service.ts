import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Batch } from './interfaces/batch.interface';
import { CreateBatchDto } from './dtos/createBatch.dto';


@Injectable()
export class BatchService {
    constructor(@Inject('BATCH_MODEL') private batchHandler: Model<Batch>){}
    //get all
    async findAll(): Promise<Batch[]> {
        return this.batchHandler.find().exec();
    }
    //create
    async create(createBatchDto: CreateBatchDto): Promise<Batch>{
        
        const createdBatchHandler = await this.batchHandler.create(createBatchDto)
        return createdBatchHandler;
    }
    //find by id
    async findOne(id:String): Promise<Batch>{
        return await this.batchHandler.findById(id);
    }
    //update
    async update(id: string, attrs: Partial<Batch>){
        let batch = await this.batchHandler.findById(id);
        if(!batch){
            throw new Error(`UPDATE - no operation handler by this number`)
        }
        Object.assign(batch, attrs);
        return batch.save();
    }
}
