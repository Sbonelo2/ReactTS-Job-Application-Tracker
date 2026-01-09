# ReactTS Job Application Tracker

<img src="https://socialify.git.ci/Sbonelo2/ReactTS-Job-Application-Tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="ReactTS-Job-Application-Tracker" width="640" height="320" />

A lightweight job-application tracker built with React + TypeScript and Vite. This project helps you track jobs you've applied to, their statuses, and basic details for each application.

## Key features

- Track jobs and their application status
- Simple, responsive UI with React + TypeScript
- Client-side routing with React Router
- User authentication (Login/Registration)
- JSON-Server for data persistence
- Modern black and white design theme
- Prepared for development with Vite and TypeScript

## Tech stack

- React 19 + TypeScript
- Vite (dev server + build)
- React Router
- JSON-Server for backend API
- ESLint for linting
- CSS3 with modern styling

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - [Download Yarn](https://yarnpkg.com/)
- **Git** - [Download Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
# Clone the repository using HTTPS
git clone https://github.com/Sbonelo2/ReactTS-Job-Application-Tracker.git

# Or clone using SSH (if you have SSH keys set up)
git clone git@github.com:Sbonelo2/ReactTS-Job-Application-Tracker.git

# Navigate into the project directory
cd ReactTS-Job-Application-Tracker
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Install JSON-Server (for backend API)

```bash
# Install JSON-Server globally (recommended)
npm install -g json-server

# Or install as a dev dependency
npm install --save-dev json-server
```

### 4. Setup the Database

The project includes a `db.json` file for data storage. Initially, it's empty. Here's how to set it up with sample data:

```bash
# Create sample data structure (optional)
echo '{
  "users": [],
  "jobs": []
}' > db.json
```

### 5. Start the Development Environment

You need to run both the frontend and backend servers simultaneously:

**Terminal 1 - Start JSON-Server (Backend):**
```bash
# Start JSON-Server on port 3000
json-server --watch db.json --port 3000

# Or if installed locally
npx json-server --watch db.json --port 3000
```

**Terminal 2 - Start Frontend Development Server:**
```bash
# Start the React development server
npm run dev
```

### 6. Access the Application

- **Frontend**: Open http://localhost:5173 in your browser
- **Backend API**: Available at http://localhost:3000
- **API Endpoints**:
  - Users: http://localhost:3000/users
  - Jobs: http://localhost:3000/jobs

## Available Scripts

From `package.json`, the following scripts are available:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Start JSON-Server (if added to package.json)
npm run server
```

### Adding JSON-Server Script (Optional)

To make it easier to start the backend, add this script to your `package.json`:

```json
{
  "scripts": {
    "server": "json-server --watch db.json --port 3000"
  }
}
```

Then you can run:
```bash
npm run server
```

## Project Structure

```
ReactTS-Job-Application-Tracker/
├── README.md
├── package.json
├── vite.config.ts
├── db.json                 # JSON-Server database file
├── src/
│   ├── main.tsx           # App entry point
│   ├── App.tsx            # Root app component
│   ├── Components/        # Shared components
│   │   ├── Footer.tsx
│   │   ├── Footer.css
│   │   ├── Navbar.tsx
│   │   └── Navbar.css
│   ├── Pages/             # Route pages
│   │   ├── Home.tsx
│   │   ├── Home.css
│   │   ├── Jobs.tsx
│   │   ├── Jobs.css
│   │   ├── Landing.tsx
│   │   ├── Landing.css
│   │   ├── Login.tsx
│   │   ├── Login.css
│   │   ├── Registration.tsx
│   │   ├── Registration.css
│   │   └── Page404.tsx
│   └── assets/            # Images and static assets
└── public/                # Public assets
```

## API Usage

The application uses JSON-Server as a REST API. Here are the common operations:

### Users API
```bash
# Get all users
GET http://localhost:3000/users

# Create a new user
POST http://localhost:3000/users
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Get a specific user
GET http://localhost:3000/users/1

# Update a user
PUT http://localhost:3000/users/1
Content-Type: application/json
{
  "name": "Jane Doe"
}

# Delete a user
DELETE http://localhost:3000/users/1
```

### Jobs API
```bash
# Get all jobs
GET http://localhost:3000/jobs

# Create a new job
POST http://localhost:3000/jobs
Content-Type: application/json
{
  "company": "Tech Corp",
  "position": "Software Engineer",
  "status": "applied",
  "date": "2024-01-15",
  "userId": 1
}
```

## Development Workflow

### 1. Making Changes
- Make changes to your React components
- The development server will automatically reload
- Test your changes in the browser

### 2. Data Persistence
- All data is stored in `db.json`
- The file is automatically updated when you add/modify data
- You can manually edit `db.json` for testing

### 3. Building for Production
```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill processes on ports 3000 and 5173 (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different ports
json-server --watch db.json --port 3001
npm run dev -- --port 5174
```

**2. JSON-Server Not Found**
```bash
# Install json-server locally
npm install json-server

# Run with npx
npx json-server --watch db.json --port 3000
```

**3. CORS Issues**
JSON-Server handles CORS by default. If you encounter issues, ensure:
- Both servers are running
- No firewall blocking the ports

**4. Database File Issues**
```bash
# Reset database
echo '{}' > db.json

# Check file permissions
ls -la db.json
```

## Contributing

Contributions welcome — please open issues or PRs. Small improvements you can help with:

- Add form validation for job entries
- Add more advanced filtering and search
- Improve accessibility and responsive styles
- Add unit tests
- Enhance the UI/UX

### Development Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

Include a license if desired (MIT, Apache-2.0, etc.) — none specified in repository currently.

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/Sbonelo2/ReactTS-Job-Application-Tracker/issues)
3. Create a new issue with detailed information

---

**Happy coding! 🚀**

If you want, I can also:

- Add badges (build/test/coverage) to top of this README
- Add a short screenshot or demo GIF inside `public/` and reference it here
- Create a CONTRIBUTING.md and LICENSE file
- Set up GitHub Actions for CI/CD

Tell me which extras you'd like and I'll add them.
