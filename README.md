


# **YelpCamp - Campground Review Platform**

Welcome to the **YelpCamp** project! YelpCamp allows users to browse, review, and create campgrounds. Users can sign up, sign in, view campgrounds, leave reviews, and add new campgrounds.

---

## **Features**

- **User Authentication:** Users can sign up, sign in, and manage their sessions.
- **Campground Creation:** Users can create new campgrounds with descriptions, images, and locations.
- **Review System:** Users can leave reviews and rate campgrounds.
- **Profile Management:** Users can manage their profile details.
- **Map Integration:** View campgrounds on a map based on their location.

---

## **Prerequisites**

Before running the project, make sure you have the following installed on your machine:

- **Node.js** (for running the Express server)
- **MongoDB** (for the database)
- **npm** (Node.js package manager)

---

## **Getting Started**

Follow the steps below to get your local copy of the project running.

### **1. Clone the Repository**

Copy the following command to clone the project:

```bash
git clone https://github.com/VuthChanChesda/yelpCamp.git
```

### **2. Navigate to the Project Folder**

Copy the command below to navigate into the project directory:

```bash
cd yelpCamp
```

### **3. Install Dependencies**

Run the following command to install the backend dependencies:

```bash
npm install
```

### **4. Set Up MongoDB**

Make sure you have MongoDB running locally, or you can use a **MongoDB Atlas** cluster for a cloud-based database. If you're using a local instance, make sure to start MongoDB:

- On macOS/Linux:

  ```bash
  mongod
  ```

- On Windows, follow the MongoDB setup instructions for your version.

### **5. Set Up Environment Variables**

Create a `.env` file in the root directory to configure the project environment. You’ll need to include the following variables:

```
SECRET_KEY=your_secret_key
MONGO_URI=your_mongodb_connection_string
```

Make sure to replace `your_secret_key` and `your_mongodb_connection_string` with your own values. If you are using MongoDB Atlas, you can obtain your connection string from their dashboard.

### **6. Run the Development Server**

Now, run the application with the following command:

```bash
npm start
```

Your app should now be accessible at `http://localhost:3000/`.

---

## **Usage**

- **Sign up**: Create a new account by providing your email, username, and password.
- **Sign in**: Log into the site to access and manage your account.
- **Create Campgrounds**: Add new campgrounds with descriptions and images.
- **Review Campgrounds**: Leave reviews and rate campgrounds.
- **Explore Campgrounds**: View all available campgrounds, filter by location, and check ratings.

---

## **Contributing**

Feel free to fork the repository and submit pull requests if you want to contribute to the project. If you encounter any issues or have suggestions for improvement, please open an issue.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any questions or feedback, feel free to reach out to me via GitHub or email.

