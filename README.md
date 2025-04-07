# Computer Science NEA - Final: Very Awesome Algorithm Visualiser (VAAV)

Welcome to the final version of my **A-Level Computer Science NEA (Non-Exam Assessment)** project, hosted at `charlierobertsuk/Computer-Science-NEA-Final` and deployed live at [https://pokemon.charlieroberts.uk]! This is the completed iteration of the **Very Awesome Algorithm Visualiser (VAAV)**, an interactive web application designed to visualise and compare sorting algorithms. Built with **React** and **Vite**, this project represents the culmination of my coursework, enhancing earlier prototypes with a modern frontend framework, improved features, and a polished user experience.

## About This Project

The Very Awesome Algorithm Visualiser (VAAV) is an educational tool aimed at helping users understand sorting algorithms through dynamic visualisations and real-time performance metrics. This final version builds on my Prototype V1 and V2 efforts, integrating React for a reactive UI, Vite for fast development, and additional functionality to meet my NEA objectives.

### Objectives
- Visualise sorting algorithms with animated bars and detailed statistics.
- Enable side-by-side comparison of two algorithms on identical datasets.
- Provide an intuitive, responsive interface for experimenting with array sizes, speeds, and algorithms.
- Deliver a complete, production-ready application for educational use.

### Technologies Used
- **React**: Frontend library for building a dynamic, component-based UI.
- **Vite**: Build tool for fast development with Hot Module Replacement (HMR).
- **JavaScript**: Core logic for algorithm implementation and animations.
- **ESLint**: Ensures code quality with linting rules.
- **HTML/CSS**: Structure and styling of the application.
- **Git**: Version control hosted on GitHub.

## Features
- **Dual Visualiser**: Compare two sorting algorithms (e.g., Bubble Sort vs. Quick Sort) side-by-side.
- **Algorithm Selection**: Choose from Bubble Sort, Merge Sort, and Quick Sort for each visualiser.
- **Customisable Settings**: Adjust array size (8, 16, 32) and animation speed.
- **Real-Time Metrics**: Displays comparisons, swaps, and time taken for each algorithm.
- **Interactive UI**: Toggle comparison mode, start/stop sorting, and reset the visualiser.
- **Responsive Design**: Adapts to various screen sizes with a modern, clean layout.
- **Code Display**: Shows pseudo-code with step-by-step highlights (fully implemented in this version).

## Files Included
- `src/`: React components, algorithm logic, and application state management.
- `public/`: Static assets (e.g., icons, images).
- `index.html`: Entry point for the application.
- `vite.config.js`: Vite configuration file.
- `.eslintrc`: ESLint configuration for code linting.
- `package.json`: Project dependencies and scripts.

## How to Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/charlierobertsuk/Computer-Science-NEA-Final.git
   ```
2. **Install Dependencies**:
   - Ensure Node.js is installed (v16+ recommended).
   - Navigate to the project folder:
     ```bash
     cd Computer-Science-NEA-Final
     ```
   - Install packages:
     ```bash
     npm install
     ```
3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:5173` (or the port Vite assigns) in your browser.
4. **Build for Production**:
   ```bash
   npm run build
   ```
   - Serve the `dist/` folder with a static server (e.g., `npx serve dist`).

## Setup Notes
- **ESLint**: The project includes basic ESLint rules. To expand for production, consider adding TypeScript and `typescript-eslint` (see Vite’s TS template).
- **Dependencies**: Listed in `package.json`. Ensure you have an internet connection for the initial `npm install`.

## Final Enhancements from Prototypes
- **React Integration**: Replaced static HTML/JS with a component-based React architecture.
- **Performance**: Vite’s fast HMR and optimised builds improve development and runtime efficiency.
- **Full Code Display**: Pseudo-code now syncs with animations, completing a key feature from V2.
- **UI Polish**: Enhanced styling and responsiveness for a professional look.
- **Stability**: Added error handling and state management for a robust experience.

## Acknowledgments
- Inspired by my earlier prototypes (V1 and V2), this project reflects months of iteration and learning.
- Thanks to my teachers and peers for feedback throughout my NEA journey.

## Feedback
This project earned me my final NEA grade, and I’m proud of the result! If you have suggestions or want to use VAAV for educational purposes, feel free to reach out or submit a pull request.

---

### Notes on Assumptions
- I assumed this is the final version of VAAV, evolved from your earlier prototypes, now using React + Vite as indicated in the GitHub snippet.
- If your NEA project is something entirely different (e.g., not VAAV), please provide more details about its purpose, features, or files, and I’ll create a new README tailored to that.
- The README is written to meet typical NEA expectations (e.g., explaining purpose, setup, and features) while aligning with the React + Vite setup.
