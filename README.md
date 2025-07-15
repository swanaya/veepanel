# VeePanel Hosting Control Panel

## Directory Structure

```
vee-panel/
├── src/                  # NestJS backend (API, business logic)
├── frontend/             # React panel UI (Vite/React/TS)
├── nginx/                # NGINX config templates & generated configs
│   ├── veepanel.ketivee.com.conf   # Panel config
│   ├── host.conf                  # JSON for host/server info (MongoDB, SMTP, etc.)
├── data/                 # App data, logs, user uploads, etc.
├── vee_panel.db          # SQLite (if used for dev)
├── .env                  # Environment variables (MongoDB, SMTP, etc.)
├── README.md
└── package.json          # Root for monorepo scripts (optional)
```

## NGINX Config Example (Panel)
See `nginx/veepanel.ketivee.com.conf` for a production-ready config.

## Host Config Example
See `nginx/host.conf` for MongoDB, SMTP, and port settings.

## Environment Variables
See `.env.example` for required variables.

---

For more, see each subfolder's README or documentation.

# VeePanel Backend

A modern, scalable NestJS backend for the VeePanel web hosting control panel.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access
- 🏠 **Website Management** - Create, manage, and monitor websites
- 🗄️ **Database Management** - Support for MySQL, PostgreSQL, MongoDB
- 📧 **Email Management** - Mail server configuration and management
- 🔒 **SSL Management** - Automatic SSL certificate generation and renewal
- 💾 **Backup System** - Automated backup and restore functionality
- 📊 **System Monitoring** - Real-time system metrics and monitoring
- 📚 **API Documentation** - Swagger/OpenAPI documentation

## Tech Stack

- **Framework**: NestJS
- **Database**: TypeORM with MySQL/PostgreSQL/MongoDB support
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate limiting

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL/PostgreSQL/MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vee-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE vee_panel;
   ```

5. **Run the application**
   ```bash
   # Development
   npm run start:dev
   
   # Production
   npm run build
   npm run start:prod
   ```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:4000/api/docs
- **API Base URL**: http://localhost:4000/api

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data transfer objects
│   ├── guards/          # Auth guards
│   ├── strategies/      # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # User management
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── sites/               # Website management
├── databases/           # Database management
├── email/               # Email management
├── ssl/                 # SSL certificate management
├── backup/              # Backup system
├── system/              # System monitoring
├── app.module.ts        # Root module
└── main.ts             # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | - |
| `DB_DATABASE` | Database name | vee_panel |
| `JWT_SECRET` | JWT secret key | - |
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Sites
- `GET /api/sites` - Get all sites

### Databases
- `GET /api/databases` - Get all databases

## Development

### Adding New Modules

1. Generate a new module:
   ```bash
   nest generate module module-name
   ```

2. Generate a controller:
   ```bash
   nest generate controller module-name
   ```

3. Generate a service:
   ```bash
   nest generate service module-name
   ```

### Database Migrations

The application uses TypeORM with automatic synchronization in development. For production, you should use migrations:

```bash
# Generate migration
npm run typeorm:generate-migration -- -n MigrationName

# Run migrations
npm run typeorm:run-migrations
```

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- CORS protection
- Helmet for security headers
- Input validation with class-validator
- Rate limiting (can be added)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License. 