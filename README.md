
# SaveGames MERN Application

SaveGames is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to save and manage their favorite video games.

## Features

- Fetches all games data from mobygames api
- CRUD operations for managing saved games
- Game search and filtering
- Responsive UI for desktop and mobile devices

## Technologies Used

- **Frontend**: React.js, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Deployment**: Render 

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/savegames-mern.git](https://github.com/varadkadtan/SaveGames-MERN-API.git
   cd savegames-mern
   ```

2. **Install dependencies**:

   For both frontend and backend, navigate to their respective directories (`client` for frontend, `server` for backend) and run:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `server` directory and add the following variables:

   ```plaintext
   MONGO_URI=mongodb+srv://username:password@cluster.sviazxr.mongodb.net/gameDB?retryWrites=true&w=majority&appName=Cluster
   API_KEY="YOUR API KEY"
   PORT = 5000
   ```

   Replace `<your_mongodb_uri>` with your MongoDB connection string and `"YOUR API KEY"` with a secret key for mobygames.

4. **Start the backend server**:

   ```bash
   noder server.mjs
   ```

   This will start the backend server on `http://localhost:5000`.

5. **Start the frontend development server**:

   Open a new terminal, navigate to the `client` directory, and run:

   ```bash
   cd client
   npm start
   ```

   This will start the frontend development server on `http://localhost:3000`.

6. **Access the application**:

   Open your web browser and go to `http://localhost:3000` to access the SaveGames application.

## Deployment

The application is deployed using the following services:

- https://savegames-mern-api-1-frontend.onrender.com/

## API Used

The application fetches game data from MobyGames API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
