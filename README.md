# TheCloudCode - AI-Powered Tech Newsletter Platform

![TheCloudCode Banner](/.github/assets/banner.png)

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-blue.svg?style=for-the-badge&logo=openjdk" alt="Java 21">
  <img src="https://img.shields.io/badge/Spring_Boot-3.3.5-brightgreen.svg?style=for-the-badge&logo=spring" alt="Spring Boot">
  <img src="https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/MySQL-8.0-orange.svg?style=for-the-badge&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/OpenAI-GPT_3.5_Turbo-00A67E?style=for-the-badge&logo=openai" alt="OpenAI">
</p>

**TheCloudCode** is a complete, full-stack newsletter automation platform designed to curate and deliver the latest tech news. It automatically fetches articles from top RSS feeds, uses AI to summarize, categorize, and score them, and sends beautifully formatted daily and weekly newsletters to subscribers.

---

## 🎥 Live Demo

[![TheCloudCode Demo Video](/.github/assets/thumbnail.png)](https://www.youtube.com/watch?v=your_video_id_here)

**[Click here to watch the full demo on YouTube](https://www.youtube.com/watch?v=your_video_id_here)**

---

## ✨ Key Features

-   **🤖 AI-Powered Content Curation**: Utilizes the OpenAI API (GPT-3.5 Turbo) to:
    -   Generate concise summaries for each article.
    -   Assign a relevance score (1-10) to prioritize content.
    -   Automatically categorize articles (e.g., AI/ML, Security, Hardware).
    -   Generate engaging newsletter subject lines.
-   **📰 Automated RSS Aggregation**: Fetches the latest articles from multiple tech sources like TechCrunch and The Verge.
-   **📧 Scheduled & Manual Dispatch**:
    -   Automatically sends daily newsletters every weekday at 8 AM IST.
    -   Automatically sends a weekly roundup every Monday at 9 AM IST.
    -   Admin panel allows for manually triggering newsletter sends.
-   **🔐 Secure Admin Panel**: A protected, login-only dashboard for managing the entire newsletter workflow.
-   **📈 Subscriber Management**: Simple API endpoints for handling user subscriptions and unsubscriptions, with a real-time subscriber count on the admin dashboard.
-   **😂 Hacker Taunt Page**: A humorous and informative taunt page for anyone who tries to access the admin panel from an unauthorized IP address.

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center"><strong>Homepage</strong></td>
      <td align="center"><strong>About Us</strong></td>
    <td align="center"><strong>Admin Dashboard</strong></td>
  </tr>
  <tr>
    <td><img src="/.github/assets/LandingPage.png" alt="Homepage Screenshot" /></td>
     <td><img src="/.github/assets/FeaturesAndNews.png" alt="About us Screenshot" /></td>
    <td><img src="/.github/assets/AdminPanel.png" alt="Admin Dashboard Screenshot" /></td>
  </tr>
   <tr>
    <td align="center"><strong>Welcome Mail After Subscription/strong></td>
    <td align="center"><strong>Daily News Feed/strong></td>
    <td align="center"><strong>Weekly News Feed</strong></td>
  </tr>
  <tr>
    <td><img src="/.github/assets/WelcomeMail.png" alt="Taunt Page Screenshot" /></td>
     <td><img src="/.github/assets/DailyNews.png" alt="Taunt Page Screenshot" /></td>
      <td><img src="/.github/assets/WeeklyNews.png" alt="Taunt Page Screenshot" /></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

<table width="100%">
  <tr>
    <td valign="top" width="50%">
      <h3>Backend (Spring Boot)</h3>
      <ul>
        <li><strong>Framework</strong>: Spring Boot 3.3.5</li>
        <li><strong>Language</strong>: Java 21</li>
        <li><strong>Database</strong>: MySQL with Spring Data JPA</li>
        <li><strong>AI Integration</strong>: OpenAI API (via `com.theokanning.openai-gpt3-java`)</li>
        <li><strong>API</strong>: RESTful APIs with Spring Web</li>
        <li><strong>RSS Parsing</strong>: ROME Tools</li>
        <li><strong>HTML Scraping</strong>: Jsoup (for image extraction)</li>
        <li><strong>Build Tool</strong>: Maven</li>
        <li><strong>Scheduling</strong>: Spring Scheduler (`@Scheduled`)</li>
      </ul>
    </td>
    <td valign="top" width="50%">
      <h3>Frontend (React)</h3>
      <ul>
        <li><strong>Framework</strong>: React 19</li>
        <li><strong>Routing</strong>: React Router</li>
        <li><strong>API Client</strong>: Axios</li>
        <li><strong>State Management</strong>: React Context API (for Auth)</li>
        <li><strong>Styling</strong>: Custom CSS</li>
        <li><strong>Build Tool</strong>: Create React App (react-scripts)</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Java JDK 21
-   Apache Maven
-   Node.js and npm
-   MySQL Server
-   An OpenAI API Key

### 1. Backend Setup

```bash
# Clone the repository
git clone [https://github.com/your-username/samarthkoli-thecloudcode-backend.git](https://github.com/your-username/samarthkoli-thecloudcode-backend.git)
cd samarthkoli-thecloudcode-backend

# Create an application.properties file
# Navigate to src/main/resources/ and create a file named application.properties
# configure your applicatiion.properties credentials:
```

# Build and run the Spring Boot application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`.

### 2. Frontend Setup

```bash
# Open a new terminal
# Clone the repository
git clone [https://github.com/your-username/samarthkoli-thecloudcode-frontend.git](https://github.com/your-username/samarthkoli-thecloudcode-frontend.git)
cd samarthkoli-thecloudcode-frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will be available at `http://localhost:3000`. 


## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 👤 Author

**Samarth Koli**

-   GitHub: [@samarthkoli](https://github.com/samarthkoli)
-   LinkedIn: [samarth-koli](https://www.linkedin.com/in/samarth-koli/)