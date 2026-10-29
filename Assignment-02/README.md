# Assignment-02

## Create a React based application in GitHub

- **Name:** Nilesh Verma
- **Roll No:** 58
- **Course:** M.C.A
- **Subject:** Full Stack Application

---

## Problem Statement

1. Create a React app in your own GitHub account.
2. The application will have a single page with the structure given in the attached image (PayPal Open landing page).
3. Currently all data is static.
4. Share the GitHub repo link in the assignment section.

---

## Project: [paypal](./paypal)

A single page React application built with Vite that recreates the PayPal Open landing page layout.

### Features

- Navbar with menu items (Personal, Business, Partners, Useful Info) and Log In / Sign Up buttons
- Personal / Business toggle switch
- Hero section with heading, subheading, description and two action buttons
- Toggle switches the hero content between Personal and Business
- Page routing with React Router (`/`, `/signup`, `/login`)
- Demo Sign Up page with form validation (required fields, email format, password length, password match, duplicate email)
- Demo Log In page that checks the details against accounts created on the Sign Up page
- Success and error popups
- Contact Sales / Learn More open the official website in a new tab
- All data is static and stored in `src/data/content.js`
- Responsive layout for mobile screens

### Technologies Used

- React.js 18
- React Router DOM
- Vite
- CSS3

---

## Folder Structure

```
paypal/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── Auth.css
    ├── index.css
    ├── data/
    │   └── content.js
    └── components/
        ├── Navbar.jsx
        ├── Home.jsx
        ├── Toggle.jsx
        ├── Hero.jsx
        ├── Signup.jsx
        ├── Login.jsx
        └── Popup.jsx
```

---

## How to Run

```bash
cd Assignment-02/paypal
npm install
npm run dev
```

Open `http://localhost:5173` in the browser.
