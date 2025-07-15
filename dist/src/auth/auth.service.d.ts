import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { SetupDto } from './dto/setup.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
            forcePasswordChange: any;
            isTemporaryEmail: any;
            setupCompleted: any;
            twoFactorEnabled: any;
        };
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
        isActive: boolean;
        forcePasswordChange: boolean;
        isTemporaryEmail: boolean;
        setupCompleted: boolean;
        twoFactorEnabled: boolean;
        twoFactorSecret: string;
        twoFactorBackupCodes: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    setup(setupDto: SetupDto, user: any): Promise<{
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
            forcePasswordChange: boolean;
            isTemporaryEmail: boolean;
            setupCompleted: boolean;
            twoFactorEnabled: boolean;
        };
        token: string;
        message: string;
    }>;
}
