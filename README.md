# Simple Chat Room Demo (Next.js)

This is a simple chat room application built with Next.js, showcasing real-time messaging using WebSockets, styled with Chakra UI, and featuring user authentication.

## Features

- **Next.js**: React framework for server-side rendering and routing.
- **Chakra UI**: Accessible, modular, and customizable UI components.
- **WebSockets**: Real-time bidirectional communication for instant messaging.
- **User Authentication**: JWT-based login and signup (or integrate your own auth).
- **Pagination**: Infinite scroll to load older messages.
- **State Management**: SWR / SWR Infinite for data fetching & caching.
- **Message Read Status**: Track and mark messages as read.

## Tech Stack

- **Frontend**: Next.js, React, Chakra UI
- **Data Fetching**: SWR / SWR Infinite
- **Deployment**: Vercel (Next.js)

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/tommylai088/chat-room-app-nextjs.git
   cd chat-room-app-nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env.local` file in the root:
     ```
    NEXT_PUBLIC_API_HOST=your_server_url
    NEXTAUTH_SECRET="your_jwt_secret"
     ```

4. Run in development:
   ```bash
   npm run dev
   ```

5. Build & start:
   ```bash
   npm run build
   npm run start
   ```