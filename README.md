# AthenaClone 🛡️

> A modern, secure desktop online exam monitoring and proctoring application built with **Electron**, **React**, and **Vite**.

![Electron](https://img.shields.io/badge/Electron-44.x-47848F?style=for-the-badge&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

---

## 📌 Overview

**AthenaClone** is an intelligent desktop examination proctoring client designed to ensure academic integrity during remote online tests. It combines an Electron-powered native desktop container with a sleek React frontend to verify the student's testing environment, grant necessary device permissions, and provide live real-time media feeds for webcam, microphone, and entire screen sharing before permitting access to the exam.

---

## ✨ Key Features

- **🎥 Dual-Stream Real-Time Monitoring**:
  - Captures high-definition webcam video and microphone audio for student identification and ambient sound verification.
  - Captures complete desktop screen activity to monitor user interactions and deter cheating.
- **🛡️ Native Desktop Integration (Electron)**:
  - Deep OS integration leveraging Electron's `desktopCapturer` and session handlers.
  - Automatically manages media permissions and routes system display sources directly to WebRTC streams.
- **📋 Step-by-Step Security Onboarding**:
  - **Step 1: Camera & Microphone Check** — Validates hardware availability and establishes video stream.
  - **Step 2: Screen Sharing Authorization** — Ensures the proctoring engine has full visibility into user workspaces.
  - **Step 3: Readiness State** — Unlocks the examination terminal once all security standards are satisfied.
- **💎 Glassmorphic & Modern UI**:
  - Dark-mode optimized interface with fluid glassmorphism panels, live recording status indicators, and responsive dual-feed previews.
- **⚡ Ultra-Fast Dev Experience**:
  - Powered by Vite HMR and modern React 19.

---

## 🏗️ Architecture & How It Works

```
┌────────────────────────────────────────────────────────┐
│                   Electron Main Process                │
│                        (index.js)                      │
│   • BrowserWindow Management (1280x800)                │
│   • Session & Permission Request Handler               │
│   • DesktopCapturer (Screen & Loopback Audio)          │
│   • IPC Handlers & System Dialogs                      │
└───────────────────────────┬────────────────────────────┘
                            │ (Local Dev Server / IPC)
┌───────────────────────────▼────────────────────────────┐
│                  React 19 Frontend                     │
│               (Vite Dev @ Port 5173)                   │
│   • Onboarding Stepper (Camera -> Screen -> Ready)     │
│   • WebRTC MediaStream Pipelines                       │
│   • Dual Preview Panels (Webcam feed + Screen feed)    │
│   • Responsive Glassmorphic Layout                     │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
athenaclone/
├── .gitignore             # Root git ignore rules
├── index.js               # Electron main process entry point
├── package.json           # Root package configuration (Electron runner)
├── README.md              # Project documentation
└── frontend/              # React 19 + Vite frontend
    ├── index.html         # HTML root document
    ├── vite.config.js     # Vite build configuration
    ├── package.json       # Frontend dependencies and scripts
    └── src/
        ├── App.jsx        # Core proctoring setup workflow component
        ├── App.css        # Glassmorphic design and feed styling
        ├── index.css      # Design tokens, typography, and base styles
        └── main.jsx       # React application entry point
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zaheer-zee/athenaClone.git
   cd athenaClone
   ```

2. **Install Root (Electron) dependencies:**
   ```bash
   npm install
   ```

3. **Install Frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

---

## 💻 Running the Application

For development, run both the Vite frontend server and the Electron desktop wrapper:

### 1. Start the React Frontend (Terminal 1)
```bash
cd frontend
npm run dev
```
> The frontend will start at `http://localhost:5173`.

### 2. Launch the Electron Desktop App (Terminal 2)
In the project root:
```bash
npm start
```

---

## 📦 Packaging & Building DMG Installer

To package AthenaClone into a standalone macOS disk image (`.dmg`) for distribution or submission:

```bash
npm run dist
```

This command automatically:
1. Builds the production-ready React client with relative assets (`dist/`).
2. Bundles the Electron main process and assets into `AthenaClone.app`.
3. Creates a mountable installer `.dmg` in the `dist-electron/` folder:
   ```
   dist-electron/AthenaClone-1.0.0-arm64.dmg
   ```

---

## 🔮 Roadmap & Upcoming Features

- [ ] **AI-Powered Gaze & Face Detection**: Integrate MediaPipe/TensorFlow.js to alert on head turns, looking away, or multiple faces in frame.
- [ ] **Audio Anomaly Detection**: Automatic background speech or whisper detection.
- [ ] **Kiosk / Lockdown Mode**: Enforce full-screen lock and prevent window switching, Alt-Tab, or keyboard shortcuts during exams.
- [ ] **Proctor Live Dashboard**: WebRTC signaling to stream proctored feeds directly to instructors or reviewers.
- [ ] **Automated Incident Logging**: Screenshot capture and violation flag logging with timestamped audits.

---


