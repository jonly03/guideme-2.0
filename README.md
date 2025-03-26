# GuideMeApp - Video Conferencing Application

This project is a React-based video conferencing application, designed to provide a simple and efficient way for users to communicate via video, audio, and text chat.

The objective is to ultimately build it into an AI Tutor by integrating it with Gemini 2.0 real-time multimodal interactions (akin to Gemini Stream Realtime feature) to interactively guide learners through Pega Academy challenges

## App's wireframe

![](./Hackathon-GuideMe-Mock.png)

## Project Structure

The project is organized into the following directory structure:

```
src/
├── Components/
│ ├── GuideMe/
│ │ └── index.js # Main component of the application
│ ├── ChatWindow.js # Component for handling text chat functionality
│ ├── MediaControls.js # Component for managing audio, video, and screen sharing controls
│ └── SharedScreenDisplay.js # Component for displaying shared screen content
├── index.js # Entry point of the React application
```

## Component Overview

- **`GuideMe/index.js`**:
  - This is the main component of the application. It orchestrates the other components to create the video conferencing interface.
  - It manages the state for messages, media controls, and screen sharing.
  - It uses the other components (`ChatWindow`, `MediaControls`, `SharedScreenDisplay`) to render the UI.
- **`ChatWindow.js`**:
  - Handles the display of chat messages and the input for sending new messages.
  - Uses React Bootstrap components for styling and form handling.
  - Implements smooth scrolling to the bottom of the chat window when new messages are added.
  - Uses Framer Motion for message animations.
- **`MediaControls.js`**:
  - Provides controls for toggling microphone and video, and for starting/stopping screen sharing.
  - Uses React Bootstrap buttons and Lucide icons for the UI.
  - Manages the state for mute/unmute and screen sharing.
- **`SharedScreenDisplay.js`**:
  - Displays the shared screen content or a placeholder message when screen sharing is not active.
  - Uses a `<video>` element to display the screen stream.
  - Uses the Web API `navigator.mediaDevices.getDisplayMedia` to capture the screen.

## Dependencies

- **React**: Core library for building the UI.
- **React Bootstrap**: UI component library for styling and layout.
- **Lucide React**: Icon library.
- **Framer Motion**: Animation library.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm start
    ```

    This will start the application in development mode. Open your browser and navigate to `http://localhost:3000` to view the app.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

- **Modular Architecture:**
  - Maintain the existing modular architecture. Each component should have a single responsibility.
  - New features should be implemented as separate components whenever possible.
  - Components should communicate with each other through props and events.
  - Avoid tightly coupled code and promote reusability.
- **Coding Style:**
  - Follow the established coding style for React and JavaScript.
  - Use consistent indentation (2 spaces).
  - Use meaningful variable and function names.
  - Write clear and concise comments to explain complex logic.
  - Organize imports in a consistent manner.
  - Use functional components and hooks whenever possible.
  - Keep components small and focused.
  - Adhere to the React component lifecycle best practices.
- **Version Control:**
  - Create a new branch for each feature or bug fix.
  - Write clear and concise commit messages.
  - Ensure your code is well-documented and follows the project's coding style.
  - Submit a pull request with a detailed description of your changes.

## Future Improvements

- Implement WebRTC for real-time video and audio communication.
- Add user authentication.
- Improve error handling and user feedback.
- Add more styling and customization options.
- Implement testing.

## Notes

- This application uses `crypto.randomUUID()` for generating unique message IDs.
- The screen sharing functionality relies on the browser's `navigator.mediaDevices.getDisplayMedia()` API.
- The application uses React Bootstrap for styling, so familiarity with Bootstrap classes is helpful.

Feel free to reach out if you have any questions or suggestions!

## Team

- Praveen
- Naveen
- Asha
- Nelly
