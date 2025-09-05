# Muze - Real-Time Social Media Feed

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Apollo](https://img.shields.io/badge/Apollo-4.0-purple) ![Zustand](https://img.shields.io/badge/Zustand-5.0-orange) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-cyan)

A real-time social media feed component built with Next.js App Router, React, TypeScript, TailwindCSS, Apollo Client, and Zustand. Features include post fetching, infinite scrolling, like functionality, real-time updates via GraphQL subscriptions, and a mock GraphQL backend.

## Live Demo

[https://muze-xi.vercel.app/](https://muze-xi.vercel.app/)


## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Mock GraphQL API](#mock-graphql-api)
- [Testing Real-Time Updates](#testing-real-time-updates)
- [Design & Technical Decisions](#design--technical-decisions)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Deployment](#deployment)
- [Assumptions](#assumptions)
- [Future Improvements](#future-improvements)

## Project Overview

Muze is a real-time social media feed application that demonstrates modern web development practices. The application showcases:

- **Tech Stack**: React, Next.js (App Router), TypeScript, TailwindCSS, Apollo Client, Zustand, GraphQL
- **Features**:
  - Post fetching with pagination
  - Infinite scroll for seamless content loading
  - Like functionality with optimistic UI updates
  - Real-time post updates via GraphQL subscriptions
  - Responsive, accessible UI
  - Performance optimizations
  - Mock data for demonstration purposes

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/yourusername/muze.git
cd muze
```

### Install Dependencies

```bash
npm install
```

### Run the Application

#### Mock Mode (Default)

Run with mock GraphQL data (no backend required):

```bash
NEXT_PUBLIC_USE_MOCKS=true npm run dev
```

#### With GraphQL Server

Start the GraphQL server:

```bash
npm run dev:server
```

In a separate terminal, start the frontend:

```bash
npm run dev
```

#### Production Mode

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_USE_MOCKS=true # Set to false to use a real backend
NEXT_PUBLIC_GRAPHQL_HTTP=http://localhost:4000/graphql
NEXT_PUBLIC_GRAPHQL_WS=ws://localhost:4000/graphql
```

## Mock GraphQL API

### Schema

The GraphQL schema includes:

```graphql
type Post {
  id: ID!
  author: String!
  username: String!
  content: String!
  likes: Int!
  comments: Int!
  reposts: Int!
  views: Int!
  timestamp: String!
  imageUrl: String
  avatarUrl: String
  isReply: Boolean!
  parentPostId: ID
}

type Query {
  posts(page: Int!, limit: Int!): [Post!]!
}

type Mutation {
  likePost(id: ID!): Post!
}

type Subscription {
  newPost: Post!
}
```

### Mock Server Implementation

The mock server uses in-memory posts and simulates real-time updates with `setInterval`. New posts are generated every 15 seconds after an initial 5-second delay.

To run the standalone server:

```bash
npm run dev:server
```

## Testing Real-Time Updates

### Apollo Sandbox

With the GraphQL server running, open Apollo Sandbox at http://localhost:4000/graphql and test the subscription:

```graphql
subscription {
  newPost {
    id
    author
    content
    timestamp
  }
}
```

### Frontend Testing

1. Start the application with `NEXT_PUBLIC_USE_MOCKS=true npm run dev`
2. Open http://localhost:3000 in your browser
3. Wait approximately 15-20 seconds to see new posts appear automatically at the top of the feed
4. Test the like functionality by clicking the heart icon on any post

## Design & Technical Decisions

### Apollo Client

Chosen for its comprehensive GraphQL client features:
- Efficient caching mechanism
- Optimistic UI updates for mutations
- Built-in subscription support
- Seamless integration with React

### Zustand

Used for UI state management:
- Lightweight and simple API
- No boilerplate compared to Redux
- Perfect for managing UI state like tabs, modals, and dropdowns

### Next.js App Router

Provides modern React features:
- Server-side rendering for improved performance and SEO
- Simplified routing with file-system based routes
- Built-in optimizations for images and fonts

### TailwindCSS

Enables rapid UI development:
- Utility-first approach for pixel-perfect designs
- Consistent design system
- Reduced CSS bundle size

### Performance Optimizations

- React.memo for component memoization
- Apollo cache policies for efficient data fetching
- Lazy loading images
- Server-side rendering for initial page load
- Optimistic UI updates for better perceived performance

### Accessibility

- ARIA labels for interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Sufficient color contrast

## Error Handling

The application implements robust error handling:

- **FeedList Component**: Displays user-friendly error states for network failures, empty feeds, and loading states
- **Error Boundaries**: Catches and displays GraphQL errors without crashing the entire application
- **Apollo Error Policies**: Configured to handle partial data and network errors gracefully

## Testing

Unit tests are implemented with Jest and React Testing Library:

```bash
npm test        # Run all tests
npm test:watch  # Run tests in watch mode
```

Test coverage includes:
- FeedList component (loading, error, and empty states)
- PostCard component (rendering and interactions)
- User interactions (like button clicks)
- Component rendering with various props

## Deployment

### Vercel Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the environment variable `NEXT_PUBLIC_USE_MOCKS=true` for demo purposes
3. Deploy with default settings

### Subscription Support

Note that for full subscription support in production:
- Mock mode works without a backend (using client-side simulation)
- For a real implementation, deploy the GraphQL server to a service like Railway or Render that supports WebSockets

## Assumptions

- **Mock Data**: The application uses mock data for demonstration purposes
- **Subscription Simulation**: Real-time updates are simulated with setInterval in mock mode
- **In-Memory Storage**: Likes and other interactions are stored in memory only (not persisted to a database)
- **Authentication**: The application assumes a logged-in user for simplicity

## Future Improvements

- **Real Backend**: Implement a persistent database with MongoDB or PostgreSQL
- **Authentication**: Add user authentication and authorization
- **Additional Interactions**: Implement comments, reposts, and other social features
- **Error Logging**: Integrate a service like Sentry for production error tracking
- **Performance Monitoring**: Add analytics and performance monitoring
- **Offline Support**: Implement service workers for offline capabilities
- **Responsive Design**: Enhance mobile responsiveness
