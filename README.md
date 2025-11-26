# UltraShip Assignment

This project is a full-stack Employee Management System POC built with Node.js, GraphQL, and React.

## Features
- **Frontend**: React-based web app with Grid and Tile views, responsive design, and Tailwind CSS styling.
- **Backend**: Node.js + Apollo Server + GraphQL API with in-memory data store.
- **Functionality**: List employees, view details, add new employees, edit existing ones, and responsive navigation.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### 1. Backend Setup
The backend runs on port `4000`.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npx ts-node src/index.ts
   ```
   You should see: `🚀 Server ready at http://localhost:4000/`

### 2. Frontend Setup
The frontend runs on port `5173`.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit: `http://localhost:5173`

## Usage
- **Grid View**: Default tabular view of employees.
- **Tile View**: Card-based view. Toggle using the icons in the top right.
- **Add Employee**: Click the "Add Employee" button to open the modal.
- **Edit Employee**: Click the Edit icon (pencil) on any employee row or tile.
- **View Details**: Click on any employee row or tile to view full details.
