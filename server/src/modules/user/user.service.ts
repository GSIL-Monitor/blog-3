import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { encryptPwd } from 'src/common/utils/util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async IsEmptyUsers() {
    return (await this.userRepository.count()) === 0;
  }

  /**
   * 创建用户
   * @param dto
   */
  async createdUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ name: dto.name });
    if (user) {
      throw new BadRequestException('用户已存在');
    }
    return await this.userRepository.save(
      this.userRepository.create({
        ...dto,
        password: encryptPwd(dto.password),
      }),
    );
  }

  /**
   * 获取用户信息
   * @param name
   * @param id
   */
  async findOneUser(data: { name?: string; id?: number }) {
    const user = await this.userRepository.find({
      select: ['avatar', 'email', 'id', 'name', 'slogan'],
      where: { ...data },
    });

    if (user && user.length > 0) {
      return user[0];
    }
    throw new NotFoundException('没有这个用户');
  }

  /**
   * 获取用户所有信息
   * @param name
   * @param id
   */
  async findOneAllUser(data: { name?: string; id?: number }) {
    return await this.userRepository.findOne(data);
  }

  /**
   * 更新用户数据
   * @param id 用户id
   * @param date 需要更新的值
   */
  async updateUser(id: number, date: UpdateUserDto) {
    return await this.userRepository.update(id, {
      name: date.name,
      email: date.email,
      avatar: date.avatar,
      slogan: date.slogan,
    });
  }

  async updatePwd(dto: UpdatePasswordDto) {
    const user = await this.findOneAllUser({ name: dto.name });
    if (user.password !== encryptPwd(dto.oldPassword)) {
      throw new BadRequestException('密码错误');
    }
    return await this.userRepository.update(
      { name: dto.name },
      { password: encryptPwd(dto.newPassword) },
    );
  }
}
