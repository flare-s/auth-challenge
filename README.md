# Auth challenge

Practice setting up user accounts and authentication in a Node web app.

## Setup

Make sure you have Git and Node (v18) installed.

1. Clone this repo and `cd` into the directory
1. Run `npm install` to install all the dependencies
1. Run `npm run seed` to seed the database with some example data
1. Run `npm run dev` to start the server.  
   This uses the `nodemon` library to auto-restart the server when you save changes.

This app already has the routes and templates created. However the sign up/log in functionality is not implemented, and private pages are visible to anyone. You'll need to fix this.

## Checking your work

Each challenge has associated unit tests. You can either run all the tests with `npm test`, or each individual challenge's tests with `npm run test:1`, `npm run test:2` etc.

Make sure you read test failures carefully—the output can be noisy but the error message should provide useful information to help you.

## Database schema

This app let's users store their private confessions. It has tables for users, sessions and confessions. It's helpful to know the structure of the database before working with it. You can either read `database/schema.sql`, or expand the sections below.

<details>
<summary><code>users</code></summary>

| column     | type     | constraints               |
| ---------- | -------- | ------------------------- |
| id         | integer  | primary key autoincrement |
| email      | text     | unique                    |
| hash       | text     |                           |
| created_at | datetime | DEFAULT CURRENT_TIMESTAMP |

</details>

<details>
<summary><code>sessions</code></summary>

| column     | type     | constraints               |
| ---------- | -------- | ------------------------- |
| id         | integer  | primary key autoincrement |
| user_id    | integer  | references users(id)      |
| expires_at | datetime | not null                  |
| created_at | datetime | DEFAULT CURRENT_TIMESTAMP |

</details>

<details>
<summary><code>confessions</code></summary>

| column     | type     | constraints               |
| ---------- | -------- | ------------------------- |
| id         | integer  | primary key autoincrement |
| content    | text     |                           |
| user_id    | integer  | references users(id)      |
| created_at | datetime | DEFAULT CURRENT_TIMESTAMP |

</details>

## Challenge 1: sign up
