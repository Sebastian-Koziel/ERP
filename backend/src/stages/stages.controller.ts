import { Controller } from '@nestjs/common';
import { StagesService } from './stages.service';

@Controller('stages')
export class StagesController {
    constructor(
        private stagesService: StagesService
    ){}

//all

//byid

//add

//delete

//path

}
