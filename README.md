
---

# SpinGame - Crypto Gaming & NFT Rewards Platform

Welcome to SpinGame, a premium crypto gaming platform where users can spin to win SPIN tokens, collect rare NFTs, and compete in high-stakes tournaments. This project is built with a modern, fast, and scalable tech stack including React, Vite, TypeScript, and Tailwind CSS.

## ✨ Key Features

*   **Spin to Win**: An interactive prize wheel with multiple reward tiers.
*   **NFT Collection**: Users can view and manage their collected NFTs on their profile page.
*   **NFT Marketplace**: A dedicated marketplace to buy and sell SpinGame NFTs.
*   **Tournaments**: Live, upcoming, and completed tournament brackets to drive competition.
*   **Web3 Integration**: Connects to Ethereum wallets using `wagmi` for seamless on-chain interactions.
*   **Responsive Design**: A beautiful and functional interface on both desktop and mobile devices, built with **shadcn/ui**.

## 🚀 Technology Stack

This project leverages a modern and efficient set of technologies:

*   **Frontend Framework**: [React](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Web3 Connectivity**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
*   **Linting**: [ESLint](https://eslint.org/)

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or higher) and [npm](https://www.npmjs.com/) installed on your machine. A great way to manage Node versions is with [nvm](https://github.com/nvm-sh/nvm).

### Installation

1.  **Clone the Repository**
    ```sh
    git clone <YOUR_GIT_REPOSITORY_URL>
    cd <YOUR_PROJECT_DIRECTORY>
    ```

2.  **Install Dependencies**
    This command will install all the necessary packages defined in `package.json`, including React, Vite, Wagmi, and all shadcn/ui components.
    ```sh
    npm install
    ```

3.  **Set Up Environment Variables**
    For Web3 wallet connectivity (specifically for WalletConnect), you need a Project ID.
    *   Create a file named `.env.local` in the root of the project.
    *   Go to [WalletConnect Cloud](https://cloud.walletconnect.com/) to create a project and get your Project ID.
    *   Add the Project ID to your `.env.local` file:
        ```
        VITE_WALLETCONNECT_PROJECT_ID='YOUR_WALLETCONNECT_PROJECT_ID'
        ```
    *   Update the wagmi config at `src/lib/wagmi.ts` to use this environment variable.

### Running the Development Server

Once the dependencies are installed, you can start the local development server.

```sh
npm run dev
```

The application will be available at `http://localhost:8080/`. The server features Hot Module Replacement (HMR), so most changes will be reflected in your browser instantly without a full page reload.

## 📜 Available Scripts

This project comes with several pre-configured npm scripts:

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Compiles and bundles the application for production into the `dist/` directory.
*   `npm run lint`: Lints the project's TypeScript/TSX files using ESLint.
*   `npm run preview`: Serves the production build from the `dist/` directory locally to preview before deployment.

## 📁 Project Structure

The project follows a standard Vite + React structure, with key directories organized for scalability.

```
pradise2-spin-gem-nexus/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable React components
│   │   ├── ui/          # Unstyled shadcn/ui components
│   │   ├── ConnectButton.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configs
│   │   ├── utils.ts
│   │   └── wagmi.ts     # Wagmi configuration
│   ├── pages/           # Route components (app pages)
│   │   ├── Index.tsx
│   │   ├── Profile.tsx
│   │   └── ...
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── package.json         # Project dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## 🎨 Customization

### Theming

The application's theme and design system are managed through Tailwind CSS and CSS variables.

*   **Colors & Theme**: To change the color palette, modify the CSS variables in `src/index.css`. This file defines the core colors for the background, foreground, primary, secondary, and accent colors.
*   **Tailwind Config**: Advanced customizations, such as adding new animations, fonts, or breakpoints, can be done in `tailwind.config.ts`.
*   **Components**: Individual component styles can be adjusted directly in the component files located in `src/components/`.

---