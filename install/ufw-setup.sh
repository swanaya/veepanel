#!/bin/bash
# UFW firewall setup for WebPanel

ufw allow 22        # SSH/SFTP
ufw allow 80        # HTTP
ufw allow 443       # HTTPS
ufw allow 8080      # Panel HTTP (dev)
ufw allow 8443      # Panel HTTPS (prod)
ufw allow 587       # SMTP
ufw allow 993       # IMAP
ufw --force enable

echo "UFW firewall configured. Only essential ports are open." 