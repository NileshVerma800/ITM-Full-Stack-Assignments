# Assignment-01 – Student Registration and Result Management System

A responsive web application built with **HTML5, CSS3 and JavaScript**.

## Workflow

Student enters details and marks → JavaScript validates the data → total and percentage are calculated → Pass/Fail is decided → result is displayed dynamically → student object is converted to JSON → stored in Local Storage.

## Features

- Registration form: name, roll no, email, course and 5 subject marks
- Validation: name (letters only), roll no (digits, unique), email format, marks (whole numbers 0-100)
- Total (out of 500), percentage and grade (Distinction / First Class / Second Class / Pass / Fail)
- Pass rule: minimum 35 in every subject
- Result card with Pass/Fail badge, shown without page reload
- `JSON.stringify()` output shown on screen and saved in `localStorage` (key: `students`)
- Saved students table with search, delete and clear all
- ITM-branded navbar and hero header (maroon theme from the university seal)
- Dashboard stats (students, pass rate, average, topper), subject-wise bars, percentage ring
- "Fill Sample" cycles through 8 varied students (distinction, pass, fails); "Load Demo Data" adds them all at once
- Works fully offline, no Live Server or internet needed
- Copy / download JSON, Pass/Fail filter, light/dark theme toggle
- Fully responsive layout (mobile + desktop)

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and form |
| `style.css` | Styling and responsive layout |
| `script.js` | Validation, calculation, JSON and Local Storage logic |

## How to Run

1. Download or clone the repository.
2. Open `Assignment-01/index.html` in any browser.

No installation or server is required.

## Sample Stored JSON

```json
{
  "name": "Nilesh",
  "rollNo": "58",
  "email": "nilesh@example.com",
  "course": "MCA",
  "marks": { "Mathematics": 78, "Programming": 85, "Database": 72, "Networks": 66, "Web Technology": 90 },
  "total": 391,
  "percentage": 78.2,
  "grade": "Distinction",
  "result": "Pass"
}
```
