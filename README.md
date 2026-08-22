# 🌍 Globe Trotter — Personalized Travel Planning Platform

Globe Trotter is an end-to-end, interactive travel planning application that transforms the way travelers explore destinations, build multi-city itineraries, manage budgets, and share journeys.

---

## 📌 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Database Schema Overview](#-database-schema-overview)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

* **🔐 Authentication & Profiles:** Secure login, registration, and user profiles to manage travel history and account preferences.
* **📊 Central Dashboard:** Overview of upcoming trips, quick actions, recommended destinations, and budget highlights.
* **🗺️ Multi-City Itinerary Builder:** Create day-wise itineraries, add multiple city stops, reorder destinations, and assign activities.
* **🔍 Discovery & Search:**
  * **City Search:** Filter by country, popularity, and cost indices.
  * **Activity Search:** Categorize experiences (sightseeing, food, adventure) with duration and cost estimates.
* **💰 Budget Estimator & Cost Breakdown:** Visual analytics (pie/bar charts) detailing expenses across lodging, transport, meals, and activities with daily over-budget alerts.
* **📅 Timeline & Calendar Views:** Visualize daily schedules in interactive calendar or vertical timeline modes with drag-and-drop support.
* **🔗 Public Sharing:** Generate read-only public links allowing others to view or duplicate trips[cite: 1].
* **📈 Admin Dashboard (Optional):** Monitor user engagement, platform adoption, and popular destinations[cite: 1].

---

## 🛠️ Tech Stack

* **Frontend:** React.js/ Tailwind CSS
* **Backend:** Node.js (Express) 
* **Database:** monoDB / MySQL (Relational Schema)
* **Design/Mockups:** [Excalidraw Prototype](https://link.excalidraw.com/I/65VNwvy7c4X/6CzbTgEeSr1)[cite: 1]

---

## 🗄️ Database Schema Overview

```text
Users (1) ───< Trips (N) ───< Stops (N) ───< StopActivities (N) >─── Activities (1)
  │              │
  │              └───< Expenses (N)
  └───< SavedDestinations (N)
