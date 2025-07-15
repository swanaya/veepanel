import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    findAll(): {
        id: number;
        email: string;
        domain: string;
    }[];
}
