import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto  } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  
    private readonly jwtService: JwtService,
  
  ){}

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });
      
      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    

    } catch (error) {
      this.handleDBErrors(error);
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true } 
    });

    if ( !user ) 
      throw new UnauthorizedException('Las credenciales no son válidas (email)');

      if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Las credenciales no son válidas (password)');

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    }

    async checkAuthStatus( user: User ){

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
  
    }

  private getJwtToken( payload: JwtPayload ) {

    const token = this.jwtService.sign( payload );
    return token;

  }


  private handleDBErrors ( error: any): never {

    if ( error.code === '23505')
      throw new BadRequestException( error.detail );
    
      console.log(error)

    throw new InternalServerErrorException('Por favor revise los registros del servidor');

  }


  /*findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }*/
}
