import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(userId: string, dto: CreateProjectDto) {
    const normalizedName = dto.name.trim();
    if (!normalizedName) {
      throw new Error('Project name is required');
    }

    const slug =
      dto.slug ||
      normalizedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `project-${Date.now()}`;

    return this.prisma.project.create({
      data: {
        name: normalizedName,
        slug,
        description: dto.description || '',
        type: dto.type || 'WEBSITE',
        status: 'DRAFT',
        isAiGenerated: Boolean(dto.isAiGenerated),
        ownerId: userId,
      },
    });
  }

  async listProjects(userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getProjectById(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async updateProject(userId: string, projectId: string, dto: Partial<CreateProjectDto>) {
    const project = await this.getProjectById(userId, projectId);

    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        ...(dto.name ? { name: dto.name.trim() } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.type ? { type: dto.type } : {}),
        ...(dto.slug ? { slug: dto.slug } : {}),
        ...(dto.isAiGenerated !== undefined ? { isAiGenerated: dto.isAiGenerated } : {}),
        ...(dto.name ? { slug: dto.slug || project.slug } : {}),
      },
    });
  }

  async deleteProject(userId: string, projectId: string) {
    await this.getProjectById(userId, projectId);

    await this.prisma.project.delete({
      where: { id: projectId },
    });

    return { success: true, id: projectId };
  }
}
