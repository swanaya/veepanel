import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetupDto } from './dto/setup.dto';
import { generateTOTPSecret, generateBackupCodes } from '../utils/2fa';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        forcePasswordChange: user.forcePasswordChange,
        isTemporaryEmail: user.isTemporaryEmail,
        setupCompleted: user.setupCompleted,
        twoFactorEnabled: user.twoFactorEnabled
      },
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const user = this.usersRepository.create({
      ...registerDto,
      password: hashedPassword,
      role: 'user', // Default role
    });

    const savedUser = await this.usersRepository.save(user);
    const { password, ...result } = savedUser;
    
    return result;
  }

  async setup(setupDto: SetupDto, user: any) {
    // Find the user
    const currentUser = await this.usersRepository.findOne({ where: { id: user.id } });
    if (!currentUser) {
      throw new UnauthorizedException('User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(setupDto.currentPassword, currentUser.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Validate password confirmation
    if (setupDto.newPassword !== setupDto.confirmPassword) {
      throw new UnauthorizedException('New passwords do not match');
    }

    // Update password
    if (setupDto.newPassword) {
      const newPasswordHash = await bcrypt.hash(setupDto.newPassword, 12);
      currentUser.password = newPasswordHash;
      currentUser.forcePasswordChange = false;
    }

    // Update email if provided and different
    if (setupDto.newEmail && setupDto.newEmail !== currentUser.email) {
      // Check if email is already taken
      const existingUser = await this.usersRepository.findOne({ where: { email: setupDto.newEmail } });
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }
      
      currentUser.email = setupDto.newEmail;
      currentUser.isTemporaryEmail = false;
    }

    // Setup 2FA if requested
    if (setupDto.enable2FA && !currentUser.twoFactorEnabled) {
      const secret = generateTOTPSecret();
      currentUser.twoFactorSecret = secret;
      currentUser.twoFactorEnabled = true;
      
      // Generate backup codes
      const backupCodes = generateBackupCodes();
      currentUser.twoFactorBackupCodes = backupCodes;
    }

    // Mark setup as completed
    currentUser.setupCompleted = true;

    await this.usersRepository.save(currentUser);

    // Generate new token
    const payload = { email: currentUser.email, sub: currentUser.id, role: currentUser.role };
    const token = this.jwtService.sign(payload);

    // Return updated user data
    return {
      user: {
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name,
        role: currentUser.role,
        forcePasswordChange: currentUser.forcePasswordChange,
        isTemporaryEmail: currentUser.isTemporaryEmail,
        setupCompleted: currentUser.setupCompleted,
        twoFactorEnabled: currentUser.twoFactorEnabled
      },
      token,
      message: 'Setup completed successfully'
    };
  }
} 