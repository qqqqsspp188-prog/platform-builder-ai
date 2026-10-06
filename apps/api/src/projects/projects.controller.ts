import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req, @Body() dto: CreateProjectDto) {
    return this.projectsService.createProject(req.user.id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  list(@Req() req) {
    return this.projectsService.listProjects(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    return this.projectsService.getProjectById(req.user.id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: Partial<CreateProjectDto>) {
    return this.projectsService.updateProject(req.user.id, id, dto);
  }
}
