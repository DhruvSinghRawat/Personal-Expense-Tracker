💰 Personal Expense Tracker – Frontend

A clean and responsive frontend interface for an Expense Tracker system, developed using React with Vite, styled via Tailwind CSS, and enriched with interactive charts using Recharts.

⚡ Getting Started

Install dependencies:

npm install


Run the development server:

npm run dev


The app will be available at:
👉 http://localhost:5173

📁 Project Initialization

Navigate to the frontend directory:

cd frontend/expense-tracker

Development Mode
npm run dev


Starts the app with Hot Module Replacement (HMR).

Production Build
npm run build


Generates an optimized build inside the dist/ directory.

Preview Build
npm run preview


Serves the production build locally for testing.

✨ Core Functionalities
🔐 Authentication & Security

User signup and login flow

JWT-based authentication mechanism

Protected routes for authorized access only

Centralized user state using React Context

📊 Dashboard Overview

Visual representation of financial data

Income and expense summaries

Recent transaction history

Analytics for the last 30 and 60 days

📈 Income & Expense Management

Add, view, and remove income entries

Add, view, and remove expense records

Categorized transaction lists

📄 Reports & Downloads

Export income data as Excel files

Export expense data as Excel files

Graphical insights using Recharts

👤 User Profile

Upload and update profile picture

Manage personal user details

🧰 Technology Stack

React 19 – Frontend library

Vite – Fast development server and build tool

Tailwind CSS – Utility-based styling

Recharts – Charting and visualization

React Router – Client-side navigation

Axios – API communication

React Icons – Icon support

🧩 Component Structure
Layout Components

Navbar – Top navigation

SideMenu – Sidebar navigation

AuthLayout – Layout for authentication pages

DashboardLayout – Wrapper for dashboard views

Reusable Cards

InfoCard – Displays financial metrics

TransactionInfoCard – Transaction details

CharAvatar – User avatar with initials

Dashboard Modules

ExpenseOverview

IncomeOverview

FinanceOverview

ExpensesList

IncomeList

RecentTransactions

Last30DaysExpenses

IncomeLast60Days

🔗 Backend API Communication

The frontend interacts with REST APIs as listed below:

Authentication

POST /api/v1/auth/register – Register new user

POST /api/v1/auth/login – User login

GET /api/v1/auth/getUser – Fetch logged-in user

POST /api/v1/auth/upload-image – Upload profile image

Income APIs

GET /api/v1/income/get

POST /api/v1/income/add

DELETE /api/v1/income/:id

GET /api/v1/income/download-excel

Expense APIs

GET /api/v1/expense/get

POST /api/v1/expense/add

DELETE /api/v1/expense/:id

GET /api/v1/expense/download-excel

Dashboard

GET /api/v1/dashboard

🎨 Styling Approach

Tailwind CSS is used throughout the project for consistent and responsive styling.
Global styles are maintained in src/index.css.

🔐 Authentication Workflow

User signs up or logs in

Backend returns a JWT token

Token is stored in localStorage via userContext

Axios interceptor attaches token to every request

Unauthorized users are redirected to the login page

🧠 State Management

React Context (userContext) manages:

Logged-in user details

Authentication status

JWT token handling

🚦 Routing Configuration

Handled using React Router:

/auth/login – Login screen

/auth/signup – Registration screen

/dashboard – Main dashboard

/dashboard/income – Income management

/dashboard/expense – Expense management

📜 NPM Scripts
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint checks
🖼️ Screenshots

Page Screenshot Log In Page -<img width="1916" height="847" alt="image" src="https://github.com/DhruvSinghRawat/Personal-Expense-Tracker/blob/main/frontend/expense-tracker/src/assets/images/LoginPage.png" />
Sign Up Page-<img width="1850" height="841" alt="image" src="https://github.com/DhruvSinghRawat/Personal-Expense-Tracker/blob/main/frontend/expense-tracker/src/assets/images/Signup.png" />
Dashboard -<img width="1920" height="1937" alt="screencapture-localhost-5179-home-2026-01-02-20_06_41" src="https://github.com/DhruvSinghRawat/Personal-Expense-Tracker/blob/main/frontend/expense-tracker/src/assets/images/Dashboard.png" />
Expense Page-<img width="1920" height="1345" alt="image" src="https://github.com/DhruvSinghRawat/Personal-Expense-Tracker/blob/main/frontend/expense-tracker/src/assets/images/Expense.png" />
Income Page -<img width="1920" height="1340" alt="image" src="https://github.com/DhruvSinghRawat/Personal-Expense-Tracker/blob/main/frontend/expense-tracker/src/assets/images/Income.png" />

## 🎥 Project Walkthrough Video

[Click here to watch the project walkthrough on YouTube](https://youtu.be/VpPWUxt9jSA)

🚀 Current Status

Actively developed and ready for feature enhancements.

👨‍💻 Author

Dhruv Singh Rawat
4th-Year B.Tech (CSE) Undergraduate
Interested in Full-Stack Development, UI/UX, and scalable web applications
