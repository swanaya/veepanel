"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../users/entities/user.entity");
const _2fa_1 = require("../utils/2fa");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
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
    async register(registerDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.usersRepository.create({
            ...registerDto,
            password: hashedPassword,
            role: 'user',
        });
        const savedUser = await this.usersRepository.save(user);
        const { password, ...result } = savedUser;
        return result;
    }
    async setup(setupDto, user) {
        const currentUser = await this.usersRepository.findOne({ where: { id: user.id } });
        if (!currentUser) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isValidPassword = await bcrypt.compare(setupDto.currentPassword, currentUser.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        if (setupDto.newPassword !== setupDto.confirmPassword) {
            throw new common_1.UnauthorizedException('New passwords do not match');
        }
        if (setupDto.newPassword) {
            const newPasswordHash = await bcrypt.hash(setupDto.newPassword, 12);
            currentUser.password = newPasswordHash;
            currentUser.forcePasswordChange = false;
        }
        if (setupDto.newEmail && setupDto.newEmail !== currentUser.email) {
            const existingUser = await this.usersRepository.findOne({ where: { email: setupDto.newEmail } });
            if (existingUser) {
                throw new common_1.ConflictException('Email is already in use');
            }
            currentUser.email = setupDto.newEmail;
            currentUser.isTemporaryEmail = false;
        }
        if (setupDto.enable2FA && !currentUser.twoFactorEnabled) {
            const secret = (0, _2fa_1.generateTOTPSecret)();
            currentUser.twoFactorSecret = secret;
            currentUser.twoFactorEnabled = true;
            const backupCodes = (0, _2fa_1.generateBackupCodes)();
            currentUser.twoFactorBackupCodes = backupCodes;
        }
        currentUser.setupCompleted = true;
        await this.usersRepository.save(currentUser);
        const payload = { email: currentUser.email, sub: currentUser.id, role: currentUser.role };
        const token = this.jwtService.sign(payload);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map