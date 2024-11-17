# LDAP Test Tool

A web-based LDAP testing utility that allows users to test LDAP server connections and perform basic directory operations.

![LDAP Test Tool Screenshot](docs/screenshot.png)

## Features

- Test LDAP server connections
- Support for multiple LDAP server types (OpenLDAP, Active Directory, FreeIPA, 389DS)
- User search functionality
- Dark/Light mode with system preference detection
- Secure connection options (TLS/SSL)
- Advanced LDAP options
- Docker support for easy deployment
- Responsive design with Bootstrap 5
- Google Roboto font integration

## Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0
- Docker (optional, for containerized deployment)

## Quick Start

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/xhorizont/ldap-test-tool.git
cd ldap-test-tool
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Start the server:

```bash
npm start
```

5. Open http://localhost:3000 in your browser

## Configuration

Copy `.env.example` to `.env` and adjust the following variables:

```env
#Server Configuration
PORT=3000
NODE_ENV=development
#LDAP Default Configuration
DEFAULT_LDAP_URI=ldap://localhost:389
DEFAULT_BIND_DN=cn=admin,dc=example,dc=com
DEFAULT_BASE_DN=dc=example,dc=com
```

## Usage

1. Enter your LDAP server details
2. Test the connection
3. Search for users
4. View detailed user information

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ldapjs](https://github.com/ldapjs/node-ldapjs) - LDAP client and server implementation
- [Bootstrap](https://getbootstrap.com/) - Frontend framework
- [Express](https://expressjs.com/) - Web framework

## Support

If you're having issues, please:
1. Check the [FAQ](docs/FAQ.md)
2. Search existing [issues](https://github.com/xhorizont/ldap-test-tool.git)
3. Create a new issue if your problem persists

## Security

For security issues, please email security@yourdomain.com instead of using the issue tracker.

## Docker Deployment

### Using Docker Compose (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ldap-test-tool.git
```

2. Start the application:

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Using Docker

1. Build the image:
```bash
docker build -t ldap-test-tool .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --name ldap-test-tool ldap-test-tool
```

### Development with Docker

For development with hot-reload:

```bash
docker-compose up ldap-test-tool-dev
```

### Environment Variables

When running with Docker, you can pass environment variables:

```bash
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e NODE_ENV=production \
  --name ldap-test-tool \
  ldap-test-tool
```

## Docker-specific entries to `.gitignore`

```gitignore:.gitignore
# Docker
.docker/
docker-compose.override.yml
```

This setup provides:
1. Multi-stage Docker build for smaller production images
2. Development environment with hot-reload
3. Docker Compose for easy deployment
4. GitHub Actions for Docker image builds
5. Security best practices:
   - Non-root user
   - Multi-stage builds
   - Health checks
   - Production optimization
6. Development convenience features:
   - Volume mounts for hot-reload
   - Easy-to-use npm scripts
   - Separate dev and prod configurations

Would you like me to add any additional Docker features or configurations?

### Available Scripts

```bash
# Development
npm run dev         # Start development server with hot reload
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm test           # Run tests

# Docker
npm run docker:build       # Build Docker image
npm run docker:run        # Run Docker container
npm run docker:stop       # Stop Docker container
npm run docker:compose    # Start with Docker Compose
npm run docker:compose:dev # Start development environment with Docker Compose
npm run docker:compose:down # Stop Docker Compose services
```

## Project Structure

```plaintext
ldap-test-tool/
├── .github/                  # GitHub specific files
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   └── workflows/           # GitHub Actions
├── public/                  # Static files
│   ├── css/                # Stylesheets
│   ├── js/                 # Client-side JavaScript
│   └── index.html          # Main HTML file
├── src/                    # Source code
│   ├── config/             # Configuration files
│   ├── services/           # Business logic
│   └── server.js           # Express server
├── tests/                  # Test files
└── docker/                 # Docker related files
```

## Testing LDAP Connections

### Available Test Servers

1. **Forumsys LDAP Test Server**
   - URI: `ldap://ldap.forumsys.com:389`
   - Bind DN: `cn=read-only-admin,dc=example,dc=com`
   - Password: `password`
   - Base DN: `dc=example,dc=com`
   - Test Users: einstein, newton, tesla, galieleo

2. **Local OpenLDAP Server (Docker)**
```bash
docker run -d -p 389:389 --name openldap osixia/openldap:latest
```

## Features in Detail

### Security Options
- TLS Support
- SSL Support
- Certificate verification options
- SASL Authentication
- Kerberos Authentication

### Search Options
- Multiple search scopes (Base, One Level, Subtree)
- Size limits
- Time limits
- Attribute selection
- Server-specific optimizations

### UI Features
- Dark/Light mode toggle
- Responsive design
- Field-specific help tooltips
- Error handling and display
- Result formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Security

For security issues, please email security@yourdomain.com instead of using the issue tracker.

See [SECURITY.md](SECURITY.md) for our security policy.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ldapjs](https://github.com/ldapjs/node-ldapjs) - LDAP client and server implementation
- [Bootstrap](https://getbootstrap.com/) - Frontend framework
- [Express](https://expressjs.com/) - Web framework
- [Docker](https://www.docker.com/) - Containerization platform