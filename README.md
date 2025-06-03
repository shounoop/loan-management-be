# Loan Management System

A full-stack project for managing loans, built with **Express.js** (Node.js), **Spring Boot** (Java), and **MySQL**. This system demonstrates a microservices architecture, with backend services for handling business logic and data storage.

## Features

- User authentication and role management (SUPER_ADMIN, ADMIN)
- Loan application and approval workflows
- RESTful APIs for loan and user management
- Dockerized deployment for easy setup

## Project Structure

```
loan-management-be/
├── express-service/    # Node.js/Express microservice
├── spring-service/     # Java/Spring Boot microservice
├── docker-compose.yml  # Multi-service orchestration
└── README.md           # Project documentation
```

## Frontend Application
A recommended frontend for this backend is available here:
[Loan Management Frontend (Next.js)](https://github.com/shounoop/loan-management-fe)

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- (Optional) [Git](https://git-scm.com/) for cloning the repository

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shounoop/loan-management-be.git
```

```bash
cd loan-management-be
```

### 2. Start All Services with Docker Compose

Run the following command to build and start all services (MySQL, Spring Boot, Express.js):

```bash
docker compose up
```

To run in the background:

```bash
docker compose up -d
```

Docker will automatically pull required images and set up the containers.

### 3. Stopping the System

To stop all running containers:

```bash
docker compose down
```

To stop and remove all containers, networks, and images:

```bash
docker compose down --rmi all
```

## Database Setup

After the services are running, insert the initial roles into the MySQL database:

```
INSERT INTO roles(name) VALUES('SUPER_ADMIN');
INSERT INTO roles(name) VALUES('ADMIN');
```

You can run these SQL statements using a MySQL client or a tool like [DBeaver](https://dbeaver.io/) or [phpMyAdmin](https://www.phpmyadmin.net/).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For questions or support, please contact the project maintainer.
