# The Sound of Cyber - Cyberpunk Experience

An immersive web experience that transforms cybersecurity into a multisensory journey.

## Prerequisites

Before running this project, make sure you have the following installed on your computer:

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version

2. **npm** (usually comes with Node.js)
   - This is the package manager that will install all dependencies

## Setup Instructions

1. **Extract the project files**
   - Unzip this folder to your desired location
   - Open Terminal (Mac/Linux) or Command Prompt (Windows)
   - Navigate to the project folder using `cd path/to/cyberpunk-experience`

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will download all necessary packages (may take a few minutes)

3. **Start the development server**
   ```bash
   npm start
   ```
   This will start the local server and automatically open your browser

4. **View the experience**
   - The application will open at http://localhost:3000
   - If it doesn't open automatically, paste this URL into your browser

## What to Expect

- **Part 1**: The experience starts in "attack mode" with red visuals and glitch effects
- **Interactive Button**: Click the 3D emergency button to secure the system
- **Part 2**: After clicking the button, scroll down to explore additional content
- **Real-time Effects**: The background and UI elements respond dynamically to the security state

## Troubleshooting

- **Port already in use**: If port 3000 is busy, the system will suggest an alternative port
- **Installation issues**: Make sure Node.js is properly installed and restart your terminal
- **Browser compatibility**: Works best with Chrome, Firefox, Safari, or Edge (modern versions)

## Building for Production

To create a production build:
```bash
npm run build
```
This creates an optimized version in the `build` folder that can be deployed to any web server.

## Technical Stack

- React + TypeScript
- Three.js for 3D graphics
- React Three Fiber for React-Three.js integration
- Tailwind CSS for styling

---

For any questions or issues, contact: [Your Contact Information] 