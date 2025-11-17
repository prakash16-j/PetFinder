# 🐾 PawFinder – Lost & Found Pets Finder

A modern React web application to help people report **Lost Pets**, **Found Pets**, and help reunite them with their families.  
Built using **React + Vite**, **TailwindCSS**, **LocalStorage**, and a clean **Orange + Black themed UI**.

---

## 🚀 About PawFinder

PawFinder is a user-friendly platform designed to:

- Report a **Lost Pet** with full details  
- Report a **Found Pet**  
- View all Recently Lost & Found Pets  
- Open a **modal popup** to see all details  
- Move a **Lost Pet → Found Pet Dashboard**  
- Store all data safely using **localStorage**  
- Enjoy a clean, responsive, modern UI  

Perfect for learning **React Forms**, **State Management**, **Routing**, **Data Persistence**, and **UI/UX design**.

---

## ✨ Features

---

## 🔶 Lost Pets Module

Users can add lost pets with:

- Pet Name  
- Pet Type (Dog / Cat / Other)  
- Dynamic Breed Dropdown  
- Color (with **Other** → custom input)  
- Size (Small / Medium / Large / Other)  
- Gender  
- Date Lost  
- Lost Location  
- Description (with live character counter)  
- Microchip / Tag ID  
- Contact Number (**10-digit validation**)  
- Image Upload + Live Preview  

### 📌 Lost Pet Cards  
- Responsive grid  
- Clean shadow cards  
- Two-line truncated description  
- Location + Breed  
- “View Details” button  

### 📌 Lost Pet Modal Popup  
Shows:

- Full-size image  
- Full pet details  
- Contact number  
- Description  
- Lost date  
- **"Mark as Found" button → moves the pet to FoundPets**  
- Auto-updates other pages using a custom event (`found-updated`)  

---

## 🟢 Found Pets Module

Users can report a found pet with:

- Pet Type  
- Dynamic Breed  
- Color  
- Location  
- Date Found  
- Description  
- Image Upload  

### 📌 Found Pet Cards  
- Beautiful orange badge  
- Type + Date tag  
- Truncated description  
- Location + Breed  

### 📌 Found Pet Modal Popup  
Includes:

- Large image preview  
- Full details  
- “Copy Contact Number” button  
- Close button  

---

## 🖥 UI & UX Highlights

- ✨ Elegant **Black + Orange theme**  
- 📱 Fully responsive (Mobile, Tablet, Desktop)  
- 🎨 TailwindCSS-powered modern design  
- 🔔 Toast Notifications (Success, Error, Validation)  
- 🧭 Smooth navigation with React Router  
- 💾 Persistent storage using **localStorage**  
- 🖼 Modal components with overlay/blur  
- ⚡ Hover effects & transitions  
- 🔑 Clean and validated forms  

---

## 🛠️ Tech Stack

| Technology        | Purpose                            |
|------------------|------------------------------------|
| **React + Vite** | Frontend Framework & Bundler       |
| **TailwindCSS**  | Styling & responsive UI            |
| **React Router** | Page routing                        |
| **React Icons**  | Icons (Navbar + Footer + UI icons) |
| **LocalStorage** | Client-side persistent storage     |
| **React Toastify** | Alerts & notifications          |

---

PawFinder is a simple yet powerful Lost & Found Pets platform built using modern web technologies. It allows users to easily report missing pets, upload important details, and browse recently found animals. With an attractive UI, responsive layouts, and seamless data persistence using localStorage, PawFinder offers a real-world experience of how pet rescue and community-driven reporting systems operate. This project demonstrates solid frontend development skills including form handling, validation, dynamic UI updates, state management, and clean component architecture.

## 🔮 Future Enhancements (Planned Add-Ons)

These features are planned for future versions of PawFinder to make the platform more powerful and production-ready:

### 🔐 1. Authentication & User Accounts
- Email/password signup & login  
- JWT / Auth Token–based secured routes  
- Only owners can edit or delete their pet reports  
- “My Reports” dashboard  

### ☁️ 2. Backend API & Database
- Replace localStorage with a secure backend  
- Node.js + Express REST API  
- MongoDB / Firebase database for storing pet entries  
- Cloud image storage (Cloudinary / Firebase Storage)

### 📍 3. Geolocation Features
- Auto-detect user's location  
- Show pets on an interactive map (Google Maps / Leaflet)  
- Distance-based sorting (nearby lost or found pets)  

### 🔎 4. Search & Advanced Filters
- Search by pet name, location, or breed  
- Filters for type, color, date, size, gender, etc.  
- Sorting (newest, nearest, recently updated)

### 📸 5. Multiple Image Upload
- Upload 3–5 images per pet  
- Gallery inside modal  
- Image compression before upload  

### 📨 6. Contact Owner / Finder Messaging
- In-site chat system  
- Anonymous secure messaging  
- Email or SMS notification alerts  

### 🔔 7. Real-Time Alerts
- Push notifications when a similar pet is found in your area  
- Email alerts for new nearby reports  

### 🏆 8. Admin Dashboard
- Admin login (JWT secured)  
- Manage reports  
- Remove spam or false listings  
- Analytics (active lost pets, resolved cases, etc.)

### 🌙 9. Dark Mode / Theme Switcher
- Toggle between light and dark themes  
- Save preference in LocalStorage or user profile  

### 🌐 10. Deployment & SEO Upgrades
- SEO-friendly meta tags  
- Sitemap & robots.txt  
- Progressive Web App (PWA)  
- Installable mobile app behavior  
