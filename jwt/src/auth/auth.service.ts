import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../auth/dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateTeacher(email: string, password: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { email } });

    if (!teacher) return null;

    const anyTeacher: any = teacher as any;
    if (!anyTeacher.password) return null;

    let match = false;
    try {
      match = await bcrypt.compare(password, anyTeacher.password);
    } catch (err) {
      return null;
    }

    if (!match) return null;

    return {
      id: teacher.id,
      email: teacher.email,
      name: teacher.name,
      role: 'teacher',
    };
  }

  private async validateStudent(email: string, password: string) {
    const student = await this.prisma.student.findUnique({ where: { email } });

    if (!student) return null;

    // If student doesn't have a password field in DB/schema, skip
    // and return null so other validations can continue.
    // Some databases may not yet have student passwords; to enable student
    // login add a `password` field to the `Student` model and migrate.
    const anyStudent: any = student as any;
    if (!anyStudent.password) return null;

    let match = false;
    try {
      match = await bcrypt.compare(password, anyStudent.password);
    } catch (err) {
      return null;
    }

    if (!match) return null;

    return {
      id: student.id,
      email: student.email,
      name: student.name,
      role: 'student',
    };
  }

  private async validateUser(email: string, password: string) {
    // Try teacher first
    const teacherUser = await this.validateTeacher(email, password);
    if (teacherUser) return teacherUser;

    // Then try student
    const studentUser = await this.validateStudent(email, password);
    if (studentUser) return studentUser;

    return null;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }
}
