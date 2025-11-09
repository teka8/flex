# FlexLiving Reviews Dashboard

This project implements a Reviews Dashboard for FlexLiving, allowing managers to monitor property performance based on guest reviews. It includes a dashboard for managing reviews and a property details page to display selected reviews.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Key Design and Logic Decisions](#key-design-and-logic-decisions)
- [API Behaviors](#api-behaviors)
- [Google Reviews Integration](#google-reviews-integration)

## Features

- **Manager Dashboard:**
    - Displays a list of all reviews.
    - Allows filtering by channel, rating, and sorting by date or rating.
    - Search functionality for reviews.
    - Ability to approve or reject reviews for public display.
    - Overview of property performance with average ratings and review counts.
- **Property Details Page:**
    - Dynamic display of property information based on URL parameter.
    - Shows only approved reviews for the specific property.
    - Placeholder for Google Reviews integration.

## Tech Stack

- **Frontend:**
    - React (with Vite)
    - TypeScript
    - Tailwind CSS (for styling)
    - Shadcn/ui (for UI components)
    - React Router DOM (for navigation)
    - MSW (Mock Service Worker) for API mocking
    - Sonner (for toasts/notifications)
    - Lucide React (for icons)
    - Date-fns (for date formatting)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd flex2/client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Key Design and Logic Decisions

- **Mock API with MSW:** To fulfill the requirement of integrating with the Hostaway Reviews API (which is sandboxed and contains no reviews) and using provided JSON for mock data, MSW (Mock Service Worker) was chosen. This allows for a realistic API interaction experience directly in the browser without needing a separate backend server.
- **Client-side Filtering and Sorting:** Filtering and sorting of reviews are handled on the client-side using `useState` and `useMemo` hooks in the `Dashboard.tsx` component. This approach is efficient for the relatively small dataset of mock reviews and provides a responsive user experience. For larger datasets, server-side filtering and pagination would be more appropriate.
- **Dynamic Property Details:** The `PropertyDetails.tsx` page is designed to be dynamic, fetching reviews based on the `listingName` passed as a URL parameter. This allows for a single component to display details for any property.
- **Review Approval Mechanism:** Reviews can be approved or rejected from the dashboard. This state is managed within the mock API and reflected in the UI, ensuring that only approved reviews are shown on the property details page.

## API Behaviors

The mock API, powered by MSW, provides the following endpoints:

-   `GET /api/reviews/hostaway`: Returns a list of all reviews, including their approval status.
-   `PUT /api/reviews/:id/approve`: Updates the `isApproved` status of a review to `true`.
-   `PUT /api/reviews/:id/reject`: Updates the `isApproved` status of a review to `false`.

These endpoints simulate a real backend API, allowing the frontend to fetch and update review data.

## Google Reviews Integration

**Exploration and Findings:**
The Google Places API offers a way to retrieve place details, including reviews. To integrate Google Reviews, one would typically:
1.  Enable the Google Places API in a Google Cloud project.
2.  Obtain an API key.
3.  Use the "Place Details" endpoint with a `place_id` to fetch review data.

**Implementation Decision:**
For this assessment, a basic, mocked integration has been implemented. A `mockGoogleReviews.ts` file provides sample Google review data. This data is filtered by `listingName` and displayed on the `PropertyDetails.tsx` page in a dedicated "Google Reviews" section.

**Limitations of Mocked Integration:**
-   Does not involve actual API calls to Google.
-   Requires manual updating of mock data for new reviews.
-   Does not handle real-world API key management or rate limiting.

**Future Considerations for Real Integration:**
-   Implement a backend proxy to securely handle API key and make requests to the Google Places API.
-   Store `place_id` for each property to fetch relevant Google Reviews.
-   Consider displaying a subset of Google reviews or aggregating their ratings due to API limitations or display constraints.