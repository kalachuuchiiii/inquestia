# 🧠 Inquestia — Research Made Simple

A full-stack survey platform built to **bridge the gap between researchers and participants** — powered by **React**, **Node.js**, and **MongoDB**.  
It rewards respondents for participation while helping researchers gather meaningful data efficiently.

---

## 🚀 About the Project

This project was born out of a real problem I witnessed firsthand.  
A friend of mine was conducting research about online gamblers — a niche group that’s often hard to reach.  
They struggled to find participants, and most existing tools didn’t make it any easier.

That’s when I thought:  
> “What if there was a platform that helps researchers reach their audiences more effectively *and* motivates people to participate?”

So I built **Inquestia** — a system where users earn **Core Points** for answering surveys, which they can exchange for **prepaid load** or use to **boost** their own surveys for visibility.

---

## 💡 Key Features

### 🧍 Account & Authentication
- Secure email verification with hashed password storage  
- SMTP-based email system for verification codes  
- Redis caching for temporary OTPs  

### ✨ Core Points System
- Earn cores for:
  - Creating surveys (+100 cores)
  - Answering surveys (+50 cores)
  - When someone answer your survey (+50 cores)
- Redeem cores for:
  - **Prepaid load** (₱1 = 1500 cores)
  - **Survey boosts** (1 boost = 10,000 cores)

### 🔥 Streaks & Rewards
- Daily participation streaks give **+500 extra cores**
- Missing a day resets your streak

### 🏆 Leaderboards & Badges
- Top users ranked by total core points  
- Dynamic badges that evolve with your progress and contributions  

### 🤖 Inko (AI Conversations)
- Private AI assistant for conversations and insights  
- Data stored in **Redis** (expires automatically after 3 days)  
- No data shared with admins or third parties  

### ⚙️ Smart Survey Algorithm
Weights and displays surveys based on:
- Tag/interest matching  
- Boost multipliers  
- Random fairness factor  

### 🧱 Reports & Moderation
- Users can report inappropriate content  
- Admins verify and take appropriate actions (bans, deductions, or takedowns)

---

## 🧰 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React, Vite, Redux, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Utilities** | Redis (sessions & caching), Vercel (deployment) |

---


## 🧑‍💻 Development Story

I’m a **17-year-old self-taught developer**, and this project represents my first large-scale full-stack system.

I started coding on my **phone** — yes, literally — using [**Acode**](https://play.google.com/store/apps/details?id=com.foxdebug.acodefree) and **Termux**.  
For a year, I wrote, tested, and deployed backend and frontend code from a mobile device.

> 🧱 Around **60%** of the entire codebase was written purely on my phone.  
> 💻 The **other 40%** was finished after I got my first **laptop**, just a month ago.

This project isn’t just code, it’s proof that **you don’t need expensive tools to build something real**.  
All you need is passion.

---

## 🧩 Architectural Highlights

- Clean and modular component structure  
- Follows **DRY** and **SRP** principles  
- Self-registering Express routes (minimal boilerplate)  
- Custom React hooks for clean API calls  
- Responsive and elegant UI with Tailwind + Framer Motion

 
 ** I COULD HAVE DONE BETTER **

---

## 🌱 Vision

My goal is to empower students, researchers, and independent analysts who don’t have the budget or reach for large-scale survey tools.

If **this project helps even one researcher** gather data more easily — or **one respondent** feel rewarded for their time —  
then all the effort I put in was worth it.

---

## 👤 Creator’s Note

I started coding in **August 2024**, completely self-taught, learning everything I could from my phone.  
Over time, I learned that the best solutions are the simplest ones —  
and that **building something real teaches you more than any tutorial ever could**.

This system reflects that journey — built with passion, curiosity, and a lot of trial and error.  
It’s far from perfect, but it’s 100% real.

---


**-paris liam m. gabagat.**
- mama programmer na ako
