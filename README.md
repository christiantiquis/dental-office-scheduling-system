# Dental Office Online Scheduling System

## **Demo Video**

Watch a walkthrough of the Dental Office Online Scheduling System on [this link](https://youtu.be/btUcwW97X_8?si=JCiKHS_0HNPSm_0c).

## **Technologies Used**

This project leverages the following technologies to ensure scalability, maintainability, and developer productivity:

### **Frontend**

* **React:** JavaScript library for building dynamic and interactive user interfaces.

* **TypeScript:** Enhances JavaScript with static typing to catch errors early and improve developer tooling.

* **Shadcn UI:** Accessible, themeable, and reusable UI components built on Radix UI primitives.

* **Tailwind CSS:** Utility-first CSS framework for building modern, responsive interfaces quickly.

### **Backend**

* **Node.js:** JavaScript runtime built on Chrome’s V8 engine for fast server-side execution.

* **Express:** Minimalist web framework for Node.js used to build RESTful APIs efficiently.

* **MySQL:** Widely-used relational database system for storing structured data securely.

### **Deployment & Infrastructure**

* **AWS EC2:** Virtual server environment in Amazon’s cloud infrastructure to host backend and frontend components.

* **Caddy:** HTTPS-enabled web server and reverse proxy with automatic SSL certificate management.


### **Database Schema Overview**

| Table         | Column     | Type   | Notes                 |
|---------------|------------|--------|-----------------------|
| **User**      | id         | UUID   | Primary key           |
|               | first_name | string | Required              |
|               | last_name  | string | Required              |
|               | email      | string | Required, unique      |
|               | password   | string | Hashed password       |
| **Doctor**    | id         | UUID   | Primary key           |
|               | first_name | string | Required              |
|               | last_name  | string | Required              |
|               | email      | string | Required, unique      |
|               | password   | string | Hashed password       |
| **Appointment** | id         | UUID   | Primary key           |
|               | patient_id | UUID   | FK → User(id)         |
|               | doctor_id  | UUID   | FK → Doctor(id)       |
|               | date       | date   | Required              |
|               | time       | time   | Required              |
|               | service    | string | Required              |
|               | status     | string | Required              |
|               | notes      | text   | Optional              | 

---

### Notes

* **id** fields use UUID for uniqueness.  
* **email** fields are unique to prevent duplicates.  
* **patient_id** and **doctor_id** are foreign keys referencing **User** and **Doctor** tables respectively.  
* **notes** in **Appointment** is optional.  
* **status** can include values like **confirmed**, **completed**, or **cancelled**.  

---

## **Getting Started**

### **Prerequisites**

Ensure the following are installed on your machine:

* **Node.js** (v18+): [https://nodejs.org/](https://nodejs.org/)

* **npm** or **Yarn**: Comes with Node.js or install via [https://yarnpkg.com/](https://yarnpkg.com/)

* **MySQL**: [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/)

---

### **Installation**

1. **Clone the repository**

    ```bash
    git clone https://github.com/christiantiquis/dental-office-scheduling-system.git
    cd dental-office-scheduling-system
    ```

2. **Install frontend dependencies**

    ```bash
    cd frontend
    npm install
    ```

3. **Install backend dependencies**

    ```bash
    cd ../backend
    npm install
    ```

---

### **Configuration**

#### **Backend**

* Create a .env file in backend/ based on .env.example:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_DATABASE=your_db
    DB_PORT=3306
    ```

#### **Frontend**

* Create a .env file in frontend/:

    ```plaintext
    VITE_API_URL=http://localhost:3040/api
    ```

---

## **Running the Application Locally**

1. **Start MySQL Server** and ensure the database is running.

2. **Start the backend server**

    ```bash
    cd backend
    npm run build
    npm run start
    ```

3. Runs on [http://localhost:3040](http://localhost:3040)

4. **Start the frontend server**

    ```bash
    cd frontend
    npm run dev
    ```

5. Runs on [http://localhost:5173](http://localhost:5173)

---

## **Deployment**

### **General Steps**

1. **Build the frontend**

    ```bash
    cd frontend
    npm run build
    ```

2. **Copy build artifacts and backend to EC2**

    Use scp, rsync, or deploy via CI/CD.

3. **Setup on EC2:**

    * Install Node.js, MySQL, and Caddy

    * Upload .env files and configure values

    * Set up the database (e.g., run schema scripts)

    * Use pm2 to run the backend persistently

    * Configure Caddy:

        ```vim
        yourdomain.com {
            root * /var/www/your-app/frontend/dist
            encode gzip
            handle /api/* {
                reverse_proxy localhost:3040
            }
            file_server
        }
        ```

4. **Start services**

    * sudo systemctl start caddy

---

## **License**

This project is licensed under the [MIT License](LICENSE).

---
