import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SetupDto } from './dto/setup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginDto: LoginDto, req: any): Promise<{
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
    setup(setupDto: SetupDto, req: any): Promise<{
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
    getProfile(req: any): any;
}
