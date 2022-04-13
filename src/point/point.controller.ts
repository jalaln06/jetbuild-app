import { Controller, Get, NotImplementedException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('points')
@Controller('point')
export class PointController {
    @Post('/:projectId')
    createPoint(){
        throw NotImplementedException
    }
    @Get('/:projectId')
    getPointsFromProjects(){
        throw NotImplementedException
    }

}
