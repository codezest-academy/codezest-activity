# CodeZest Activity Service Context

## 1. Service Overview

The `codezest-activity` service is a microservice responsible for tracking user activities, generating activity feeds, and handling analytics events within the CodeZest platform. It serves as the central hub for "what's happening" in the system.

## 2. Key Responsibilities

- **Activity Tracking**: Records user actions (e.g., "User Joined", "Course Started", "Assignment Submitted", "Badge Earned").
- **Activity Feeds**: Provides REST APIs to fetch chronological activity feeds for specific users or global streams.
- **Event Consumption**: Listens to domain events from Redis (Pub/Sub) to automatically record activities without direct coupling to other services.

## 3. Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Message Broker**: Redis (ioredis) for event consumption
- **Architecture**: Clean Architecture (Separation of concerns)

## 4. Project Structure

The project follows a strict Clean Architecture pattern:

- **`src/domain`**: Contains enterprise business rules.
  - `entities`: Core business objects (e.g., `UserActivity`).
  - `repositories`: Interfaces defining data access contracts.
- **`src/application`**: Contains application business rules.
  - `services`: Orchestrates data flow (e.g., `ActivityService`).
  - `dtos`: Data Transfer Objects for API responses.
- **`src/infrastructure`**: External interfaces and frameworks.
  - `database`: Prisma client configuration.
  - `repositories`: Concrete implementations of domain repositories (e.g., `PrismaActivityRepository`).
  - `events`: Redis consumers for handling asynchronous events.
- **`src/presentation`**: Entry points.
  - `controllers`: Handles HTTP requests.
  - `routes`: Defines API endpoints.

## 5. Key Commands

- **Start Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Run Tests**: `npm test`
- **Lint**: `npm run lint`

## 6. Data Model

The core model is `UserActivity`, which stores:

- `userId`: The actor.
- `type`: The type of activity (ENUM).
- `description`: Human-readable description.
- `metadata`: JSON payload with event details.
- `createdAt`: Timestamp.
