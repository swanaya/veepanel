export declare class EmailService {
    findAll(): {
        id: number;
        email: string;
        domain: string;
    }[];
    getSmtpConfig(): {
        host: string;
        port: number;
        user: string;
        password: string;
    };
}
