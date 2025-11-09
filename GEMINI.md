# Project Overview

This project is a Reviews Dashboard for FlexLiving, designed to help managers monitor property performance based on guest reviews. It's a frontend web application built with React, TypeScript, and Vite, utilizing Tailwind CSS for styling and Shadcn/ui for UI components. The application features a dashboard for managing reviews (filtering, sorting, searching, approving/rejecting) and a dynamic property details page.

## Tech Stack

*   **Frontend Framework:** React (with Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Shadcn/ui
*   **Routing:** React Router DOM
*   **API Mocking:** MSW (Mock Service Worker)
*   **State Management/Utilities:** React Query, Sonner (toasts), Lucide React (icons), Date-fns

## Building and Running

To set up and run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd flex2/flex
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

4.  **Build for production:**
    ```bash
    npm run build
    ```

5.  **Lint the codebase:**
    ```bash
    npm run lint
    ```

## Development Conventions

*   **API Mocking:** The project uses Mock Service Worker (MSW) to simulate API interactions, allowing for frontend development without a live backend. Mock API endpoints are defined for fetching, approving, and rejecting reviews.
*   **Client-side Logic:** Filtering and sorting of reviews are handled on the client-side for responsiveness, suitable for the current dataset size.
*   **Dynamic Content:** Property details are displayed dynamically based on URL parameters.
*   **Review Workflow:** Reviews can be approved or rejected, with their status reflected across the application.
*   **Google Reviews:** A mocked integration for Google Reviews is present, demonstrating how such data could be displayed. A real integration would require using the Google Places API with proper API key management and a backend proxy.

## API Behaviors (Mocked)

The MSW-powered mock API provides the following endpoints:

*   `GET /api/reviews/hostaway`: Retrieves all reviews, including their approval status.
*   `PUT /api/reviews/:id/approve`: Sets a review's `isApproved` status to `true`.
*   `PUT /api/reviews/:id/reject`: Sets a review's `isApproved` status to `false`.
