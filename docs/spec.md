# Specification

## Overview

Planner is a customisable weekly planner webapp that lets users configure their schedule, define recurrent activities and produce a printable timetable.

## User Stories

| # | As a… | I want to… | So that… |
|---|-------|-----------|---------|
| 1 | User | Set the planner title, active days and time range | My planner matches my schedule |
| 2 | User | Add recurrent activities with title, time and repeat days | I can fill in my weekly routine |
| 3 | User | Choose a colour for each activity | I can visually distinguish activities |
| 4 | User | Edit or delete existing activities | I can keep the planner up to date |
| 5 | User | Preview the populated weekly grid | I can check the planner before printing |
| 6 | User | Print the planner | I can keep a physical copy |

## Pages

### Setup

Configure the planner:

- **Title** – free-text label shown on the printed planner
- **Start / End hour** – defines the visible time range (00:00–23:00)
- **Slot duration** – 15 min, 30 min or 1 hour grid rows
- **Days of week** – one or more of Mon–Sun

### Activities

Manage recurrent activities:

- **Add** – opens a form dialog with title, description, start/end time, colour and repeat days
- **Edit** – re-opens the form pre-filled
- **Delete** – removes the activity immediately

### Print

Preview the weekly grid and trigger the browser print dialog:

- Column per selected day, row per time slot
- Activity blocks coloured and labelled
- Print button triggers `window.print()`

## Out of Scope (v1)

- Persistence (localStorage / backend)
- Multiple planners
- Authentication
- Drag-and-drop reordering
