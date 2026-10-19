# DermaFlow

DermaFlow is a full-stack clinic management and appointment booking prototype designed for laser and skincare clinics.

The project was built to explore how a clinic can manage the complete journey from online booking to treatment plans and session tracking through one integrated system.

## Features

### Client Website

- Online appointment booking
- Treatment selection
- Specialist selection
- Available date and time selection
- Arabic / English interface
- Responsive design

### Admin Dashboard

- Today's clinic schedule
- Booking Inbox for website requests
- Appointment management
- Confirm, reschedule, cancel and complete appointments
- Client profiles
- Treatment plan creation
- Treatment session tracking
- Client treatment history
- Suggested next-session dates
- Scheduling preferences

### Client Portal

- Upcoming appointments
- Active treatment plans
- Session progress
- Session history
- Suggested next visits
- Scheduling preference alerts

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL
- Neon

## Project Structure

```text
clinic-booking/
│
├── src/
│   ├── pages/
│   ├── data/
│   ├── config/
│   └── utils/
│
├── Backend/
│   ├── routes/
│   ├── server.js
│   ├── db.js
│   └── schema.sql
│
└── README.md