import * as fs from 'fs';
import * as path from 'path';

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

export function loadAppConfig(): AppConfig {
  const configPath = path.resolve(__dirname, '../../nginx/host.conf');
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
} 