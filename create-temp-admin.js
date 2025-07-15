const { createConnection } = require('typeorm');
const bcrypt = require('bcryptjs');
const { User } = require('./dist/src/users/entities/user.entity');

async function createTempAdmin() {
  try {
    // Create database connection
    const connection = await createConnection({
      type: 'sqlite',
      database: 'vee_panel.db',
      entities: [User],
      synchronize: true,
    });

    // Check if admin already exists
    const userRepository = connection.getRepository(User);
    const existingAdmin = await userRepository.findOne({ where: { email: 'admin@veepanel.local' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      await connection.close();
      return;
    }

    // Create temporary password hash
    const tempPassword = 'admin123';
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    // Create temporary admin user
    const tempAdmin = userRepository.create({
      name: 'Admin User',
      email: 'admin@veepanel.local',
      password: passwordHash,
      role: 'admin',
      isActive: true,
      // Force password change on first login
      forcePasswordChange: true,
      // Temporary email flag
      isTemporaryEmail: true,
      // Setup completed flag
      setupCompleted: false
    });

    await userRepository.save(tempAdmin);
    console.log('✅ Temporary admin user created successfully!');
    console.log('📧 Email: admin@veepanel.local');
    console.log('🔑 Password: admin123');
    console.log('⚠️  IMPORTANT: Change password and email after first login!');
    console.log('🔒 2FA will be required after initial setup.');

    await connection.close();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

createTempAdmin(); 