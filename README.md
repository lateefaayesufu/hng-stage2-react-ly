# HNG Stage 2 Multi-Framework Ticket Web App – React Version

This is the **React implementation** of the Multi-Framework Ticket Web App for Frontend Stage 2.  
It is part of the continuation from frontend tasks and focuses on building a full-featured ticket management system with authentication, dashboard, and CRUD functionality.  

✦ **Overview**  
The app includes:  
- **Landing Page** – Wave hero background, decorative circles, Call-to-Action buttons.  
- **Authentication** – Login and Signup forms with validation, toast notifications, and session simulation via `localStorage`.  
- **Dashboard** – Summary statistics (Total Tickets, Open Tickets, Resolved Tickets) and navigation to ticket management.  
- **Ticket Management** – Create, Read, Update, Delete tickets with inline validation and success/error feedback.  
- Fully responsive design, accessible HTML, and consistent layout (max-width: 1440px).

✦ **Features**

### Landing Page
- Wave hero implemented with SVG.  
- Decorative circles and box-shaped feature sections with shadows and rounded corners.  
- Responsive layout for mobile, tablet, and desktop.  

### Authentication
- Login and Signup pages with validation.  
- Toast/snackbar notifications for errors or success.  
- Session stored in `localStorage` key: `ticketapp_session`.

### Dashboard
- Ticket summary statistics in card-like containers.  
- Logout button clears session and redirects to Login.

### Ticket Management (CRUD)
- **Create**: Form with validation.  
- **Read**: Cards listing tickets with status tags.  
- **Update**: Editable forms with validation.  
- **Delete**: Confirmation step and feedback.  
- Status colors:  
  - `open → green`  
  - `in_progress → amber`  
  - `closed → gray`

✦ **Data Validation & Error Handling**
- `title` and `status` are required fields.  
- `status` only accepts `"open"`, `"in_progress"`, `"closed"`.  
- Inline or toast notifications for validation errors.  
- Unauthorized access redirects to `/auth/login`.  
- Network/API failures show descriptive error messages.

✦ **Accessibility & Layout**
- Semantic HTML elements (`<main>`, `<section>`, `<header>`, `<nav>`, `<form>`, `<label>`).  
- Alt text for images.  
- Visible focus states.  
- Fully responsive using Flexbox and Grid.  
- Consistent max-width: 1440px.

✦ **Tech Stack**
- React (CRA or Vite)  
- React Router DOM  
- State Management: Context API / Redux / Zustand  
- CSS

  ✦ **Demo Credentials:**

- Email: demo@ticket.app

- Password: password123

✦ **Local Setup**
```bash
git clone <repo-url>
cd ticketapp-react
npm install
npm start


