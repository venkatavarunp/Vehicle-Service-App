# Vehicle Service System

A full-stack web application for managing vehicle services, including component registration, vehicle management, issue tracking, and revenue reporting. Built with Django for the backend and React with Vite for the frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [License](#license)

## Features

1. **Component Registration**: Operations user can register components with their repair pricing or new purchase prices.
2. **Vehicle Management**: Add and manage vehicles.
3. **Issue Tracking**: Add issues for vehicles, choosing between new components or repair.
4. **Final Price Calculation**: Calculate and display the final price (no real-world transactions).
5. **Revenue Charts**: Responsive graphs for daily, monthly, and yearly revenue.

## Tech Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Vite
- **Testing**: Vitest, React Testing Library, Jest

## Backend Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd vehicle-service
   ```

2. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Apply Migrations**

   ```bash
   python manage.py migrate
   ```

4. **Run the Development Server**

   ```bash
   python manage.py runserver
   ```

   The backend server will be available at `http://127.0.0.1:8000`.

## Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd vehicle-service-frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:3000`.

## Running the Application

1. **Start the Backend Server**: Follow the instructions in the [Backend Setup](#backend-setup) section.
2. **Start the Frontend Development Server**: Follow the instructions in the [Frontend Setup](#frontend-setup) section.

Open your web browser and navigate to `http://localhost:3000` to interact with the application.

## Testing

### Backend Tests

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Run Tests**

   ```bash
   python manage.py test
   ```

### Frontend Tests

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Run Tests**

   ```bash
   npx vitest
   ```
