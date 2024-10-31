# Trip Planner & Countdown

A modern Next.js application designed to help travelers organize and track their upcoming adventures. This comprehensive trip management system allows users to create, manage, and countdown to their next journey while maintaining an organized collection of past and future travels.

## Overview

The application serves as your personal travel companion, offering:

- **Trip Management**: Create, edit, and organize your trips with detailed information
- **Smart Categorization**: Automatically sorts trips into "Upcoming" and "Completed" categories
- **Random Trip Picker**: Can't decide where to go next? Let the application surprise you with a random selection from your upcoming adventures
- **Real-time Countdown**: Track the excitement with a precise countdown showing months, days, and hours until your next departure
- **Travel History**: Keep a record of your completed journeys for future reference

## Features

- Random trip selection from your saved trips
- Persistent trip selection (saves to localStorage)
- Real-time countdown display
- Automatic cleanup of expired trips
- Responsive design with a modern UI

## Prerequisites

- Node.js (v19 or higher recommended)
- npm or yarn

## Environment Setup

Create a `.env` file in the root directory with the following variable:

```plaintext
API_URL=your_api_endpoint_here
```

For the API endpoint documentation, visit: [API Documentation](your_api_docs_link_here)

## Usage

The application provides a simple interface where users can:

- Click the "Pick Random Trip" button to randomly select a trip
- View a countdown timer showing months, days, and hours until the trip
- The selected trip persists across browser sessions
- Countdown automatically resets when the trip date passes

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI for components
- React-Query for data fetching
- React-Hook-Form for form handling
