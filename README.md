# 🌱 ServeSync – NGO Event & Volunteer Management Platform

### Connecting Volunteers, Managing Events, Creating Community Impact.

Voluntra is a full-stack web-based NGO Event and Volunteer Management Platform developed to simplify and organize the management of NGO activities, events, volunteers, event registrations, and attendance.

The platform provides a centralized dashboard where NGO administrators can manage important information through a simple and user-friendly interface.

---

## 📌 About the Project

Non-Governmental Organizations (NGOs) regularly conduct activities such as tree plantation drives, blood donation camps, food distribution, educational programs, awareness campaigns, and community service events.

Managing event details, volunteer information, registrations, and attendance manually can become difficult as the number of events and volunteers increases.

Voluntra solves this problem by providing a centralized digital platform for managing these activities.

The system allows administrators to create and manage events, maintain volunteer information, handle event signups, and record volunteer attendance.

---

## 🎯 Objectives

The main objectives of Voluntra are:

- Digitize NGO event management.
- Maintain volunteer information in a centralized database.
- Manage NGO events efficiently.
- Allow volunteers to register for events.
- Track volunteer participation and attendance.
- Provide CRUD operations for managing records.
- Reduce manual record-keeping.
- Provide a simple and organized dashboard.
- Secure backend APIs using Spring Security.
- Store application data using MySQL.

---

# 🚀 Main Features

## 📊 Dashboard

The dashboard provides an overview of the NGO's activities.

It displays:

- Total Events
- Total Volunteers
- Total Signups
- Total Attendance
- Upcoming Events
- Quick Actions

The dashboard allows administrators to understand the current status of NGO activities from a single screen.

---

## 📅 Event Management

The Events module allows administrators to manage NGO events.

### Event information includes:

- Event ID
- Event Name
- Location
- Event Date
- Volunteer Capacity

### Available operations:

- Add Event
- View Events
- Update Event
- Delete Event
- Search Events

Example events:

- Blood Donation Camp
- Tree Plantation Drive
- Food Distribution
- Community Awareness Program
- Educational Support Program

---

## 👥 Volunteer Management

The Volunteer module stores information about volunteers participating in NGO activities.

### Volunteer information includes:

- Volunteer ID
- Volunteer Name
- Email
- Phone Number

### Available operations:

- Add Volunteer
- View Volunteers
- Update Volunteer
- Delete Volunteer
- Search Volunteers

---

## 📝 Event Signup Management

The Signup module manages the registration of volunteers for NGO events.

A signup connects a volunteer with an event.

### Signup information includes:

- Signup ID
- Event ID
- Volunteer ID
- Signup Status

Example:

```text
Event ID: 5
Volunteer ID: 10
Status: Registered
