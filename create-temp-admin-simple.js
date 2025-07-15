const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

async function createTempAdmin() {
  try {
    // Connect to SQLite database
    const dbPath = path.join(__dirname, 'vee_panel.db');
    const db = new sqlite3.Database(dbPath);

    // Create users table if it doesn't exist
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        role VARCHAR DEFAULT 'user',
        isActive BOOLEAN DEFAULT 1,
        forcePasswordChange BOOLEAN DEFAULT 0,
        isTemporaryEmail BOOLEAN DEFAULT 0,
        setupCompleted BOOLEAN DEFAULT 0,
        twoFactorEnabled BOOLEAN DEFAULT 0,
        twoFactorSecret VARCHAR,
        twoFactorBackupCodes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTableSQL, (err) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }

      // Check if admin already exists
      db.get("SELECT * FROM user WHERE email = 'admin@veepanel.local'", (err, row) => {
        if (err) {
          console.error('Error checking existing admin:', err);
          return;
        }

        if (row) {
          console.log('Admin user already exists!');
          db.close();
          return;
        }

        // Create temporary password hash
        bcrypt.hash('admin123', 12).then(passwordHash => {
          // Insert temporary admin user
          const insertSQL = `
            INSERT INTO user (
              name, email, password, role, isActive, 
              forcePasswordChange, isTemporaryEmail, setupCompleted
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

          db.run(insertSQL, [
            'Admin User',
            'admin@veepanel.local',
            passwordHash,
            'admin',
            1, // isActive
            1, // forcePasswordChange
            1, // isTemporaryEmail
            0  // setupCompleted
          ], function(err) {
            if (err) {
              console.error('Error creating admin user:', err);
            } else {
              console.log('✅ Temporary admin user created successfully!');
              console.log('📧 Email: admin@veepanel.local');
              console.log('🔑 Password: admin123');
              console.log('⚠️  IMPORTANT: Change password and email after first login!');
              console.log('🔒 2FA will be required after initial setup.');
            }
            db.close();
          });
        });
      });
    });

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
}

createTempAdmin(); 