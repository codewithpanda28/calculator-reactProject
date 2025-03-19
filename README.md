# Neumorphic Calculator

## Overview
This project is a **Calculator Web Application** built using **Next.js** and **Tailwind CSS**. It provides a modern and interactive user interface for performing basic arithmetic operations. The application is designed with **responsive UI** and includes keyboard support for enhanced user experience.

## Features
- **Basic Arithmetic Operations**: Addition, Subtraction, Multiplication, Division.
- **Keyboard Support**: Perform calculations using keyboard input.
- **Neumorphic UI Design**: A modern, soft-shadow aesthetic using Tailwind CSS.
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Dark Mode Support**: Adaptable UI with theme variables.
- **Memory and State Management**: Maintains calculation history within a session.

## Tech Stack
- **Frontend**: Next.js (React Framework)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **UI Components**: Custom button components

## Project Structure
```
📂 project-root/
├── 📂 components/
│   ├── button.tsx        # Reusable button component
│   ├── calculator.tsx    # Main calculator logic and UI
├── 📂 pages/
│   ├── index.tsx (page.tsx) # Homepage rendering the calculator
├── 📂 styles/
│   ├── globals.css       # Global styles including dark mode
├── 📂 lib/
│   ├── utils.ts          # Utility functions
├── layout.tsx            # Root layout configuration
├── README.md             # Project documentation
```

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (Latest LTS recommended)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/calculator-web-app.git
   cd calculator-web-app
   ```
2. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev  # or yarn dev
   ```
4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Usage
1. Use the on-screen buttons to enter numbers and perform calculations.
2. Use your keyboard for quick input:
   - **Numbers (0-9)**: Enter digits
   - **+ , - , * , /**: Perform operations
   - **Enter**: Calculate result
   - **C**: Clear input
3. The app maintains previous expressions until a new calculation begins.

## File Breakdown
### `calculator.tsx`
- Manages calculator state (`display`, `expression`, `operation`, `prevValue`).
- Implements functions for handling button clicks, performing calculations, and handling keyboard events.

### `button.tsx`
- A reusable button component using Tailwind's utility classes.
- Supports different variants (`default`, `destructive`, `outline`, `secondary`).

### `globals.css`
- Contains global styles and color themes.
- Implements dark mode styling.

### `layout.tsx`
- Configures the page layout.
- Imports and applies global fonts and styles.

## Future Improvements
- Implement history tracking for previous calculations.
- Add scientific calculator functionalities (square root, exponents, etc.).
- Store last session’s calculations in local storage.
- Improve accessibility for visually impaired users.

## License
This project is **MIT Licensed**. Feel free to use and modify it as per your needs.

## Contact
For any issues or suggestions, please reach out:
- **GitHub**: [@codewithpanda28](https://github.com/codewithpanda28)
- **LinkedIn**: [@codewithpanda28](https://www.linkedin.com/in/codewithpanda28/)

