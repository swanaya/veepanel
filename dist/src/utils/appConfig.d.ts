export type AppConfig = {
    mongodb: {
        uri: string;
        user: string;
        password: string;
    };
    smtp: {
        host: string;
        port: number;
        user: string;
        password: string;
    };
    nginx: {
        panel_port_http: number;
        panel_port_https: number;
        web_port_http: number;
        web_port_https: number;
    };
    other_ports: {
        redis: number;
        ftp: number;
        ssh: number;
    };
};
export declare function loadAppConfig(): AppConfig;
