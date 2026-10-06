import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(userId: string, dto: CreateProjectDto) {
    const normalizedName = dto.name.trim();
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
        isAiGenerated: dto.isAiGenerated || false,
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
    return this.prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });
  }

  async updateProject(userId: string, projectId: string, dto: Partial<CreateProjectDto>) {
    const project = await this.getProjectById(userId, projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        ...(dto.name ? { name: dto.name.trim() } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.type ? { type: dto.type } : {}),
        ...(dto.slug ? { slug: dto.slug } : {}),
        ...(dto.isAiGenerated !== undefined ? { isAiGenerated: dto.isAiGenerated } : {}),
      },
    });
  }
}
