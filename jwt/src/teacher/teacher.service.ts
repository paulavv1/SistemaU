import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import * as bcrypt from 'bcryptjs'; // 👈 NUEVO

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly teacherIncludes = {
    speciality: true,
    career: true,
    subjects: true,
  };

  // ==========================
  // CREATE
  // ==========================
  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: {
          email: createTeacherDto.email,
        },
      });

      if (existingTeacher) {
        throw new ConflictException('Teacher already exists');
      }

      // 🔐 Hasheamos la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

      const teacher = await this.prisma.teacher.create({
        data: {
          name: createTeacherDto.name,
          email: createTeacherDto.email,
          phone: createTeacherDto.phone,
          age: createTeacherDto.age,
          specialityId: createTeacherDto.specialityId,
          careerId: createTeacherDto.careerId,
          password: hashedPassword, // 👈 AHORA SÍ MANDAMOS PASSWORD
        },
        include: this.teacherIncludes,
      });

      return teacher;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Teacher with this email already exists',
          );
        }
      }

      throw new InternalServerErrorException('Error creating teacher');
    }
  }

  // ==========================
  // FIND ALL
  // ==========================
  async findAll(findWithPagination: PaginationDto) {
    const { page = 1, limit = 10 } = findWithPagination;
    const skip = (page - 1) * limit;

    try {
      const [data, total] = await Promise.all([
        this.prisma.teacher.findMany({
          skip,
          take: limit,
          include: this.teacherIncludes,
        }),
        this.prisma.teacher.count(),
      ]);

      return {
        data,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching teachers');
    }
  }

  // ==========================
  // FIND ONE
  // ==========================
  async findOne(id: number) {
    try {
      const teacher = await this.prisma.teacher.findUnique({
        where: { id },
        include: this.teacherIncludes,
      });

      if (!teacher) {
        throw new NotFoundException('Teacher not found');
      }

      return teacher;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching teacher');
    }
  }

  // ==========================
  // UPDATE
  // ==========================
  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: { id },
      });

      if (!existingTeacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }

      if (updateTeacherDto.email) {
        const duplicateEmail = await this.prisma.teacher.findFirst({
          where: {
            email: updateTeacherDto.email,
            id: { not: id },
          },
        });

        if (duplicateEmail) {
          throw new ConflictException(
            `Teacher with email ${updateTeacherDto.email} already exists`,
          );
        }
      }

      // Construimos el data para poder interceptar password
      const data: Prisma.TeacherUpdateInput = {
        name: updateTeacherDto.name,
        email: updateTeacherDto.email,
        phone: updateTeacherDto.phone,
        age: updateTeacherDto.age,
        speciality: updateTeacherDto.specialityId
          ? { connect: { id: updateTeacherDto.specialityId } }
          : undefined,
        career: updateTeacherDto.careerId
          ? { connect: { id: updateTeacherDto.careerId } }
          : undefined,
      };

      // Si viene un nuevo password, lo hasheamos
      if (updateTeacherDto.password) {
        data.password = await bcrypt.hash(updateTeacherDto.password, 10);
      }

      const updatedTeacher = await this.prisma.teacher.update({
        where: { id },
        data,
        include: this.teacherIncludes,
      });

      return updatedTeacher;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating teacher');
    }
  }

  // ==========================
  // REMOVE
  // ==========================
  async remove(id: number) {
    try {
      const existingTeacher = await this.prisma.teacher.findUnique({
        where: { id },
      });

      if (!existingTeacher) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }

      await this.prisma.teacher.delete({
        where: { id },
      });

      return { message: `Teacher with ID ${id} has been successfully removed` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error removing teacher');
    }
  }
}
