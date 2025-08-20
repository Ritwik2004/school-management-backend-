# 🏫 Schools Backend API

A simple backend service built with **Node.js, Express, and PostgreSQL (Neon)** to manage schools' data. It allows you to:

- Add new schools with location data (latitude & longitude)
- List all schools ordered by **distance** from a given location (using the Haversine formula)

## ⚡ Features

- RESTful API built with Express
- PostgreSQL database hosted on Neon
- Input validation with **express-validator**
- Auto-incrementing `id` for schools
- Timestamps for record creation
- Distance calculation (in KM) between user and schools

## 📂 Project Structure

```
/project-root
 ├── src/
 │   ├── controllers/
 │   │   └── controller.js              # API controllers
 │   ├── database/
 │   │   └── db.js                      # Neon DB connection
 │   ├── routes/
 │   │   └── routes.js                  # Express routes
 │   ├── utils/
 │   │   └── distance.js                # Express routes
 │   ├── validator/
 │   │   └── school.validator.js        # Express routes
 │   ├── server.js                      # Express server entry
 │        
 ├── package.json
 └── README.md
```

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL (Neon serverless DB)**
- **express-validator** for validation
- **postgres.js** (`@neondatabase/serverless`) for database queries

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/schools-backend.git
cd schools-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your Neon database connection string:

```env
DATABASE_URL=postgres://user:password@host/dbname
PORT=3000
```

### 4. Database Setup

Run the following SQL query in your Neon console to create the `schools` table:

```sql
CREATE TABLE IF NOT EXISTS schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the server

```bash
npm run dev
```

Server will be running at: **http://localhost:3000**

## 📌 API Endpoints

### 1. Add School

**Endpoint:** `POST /schools`

**Request Body (JSON):**
```json
{
  "name": "ABC Public School",
  "address": "123 Main Street, Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

**Response:**
```json
{
  "message": "School added",
  "school": {
    "id": 1,
    "name": "ABC Public School",
    "address": "123 Main Street, Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "created_at": "2025-08-20T15:05:00.000Z"
  }
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `address`: Required, non-empty string  
- `latitude`: Required, valid number between -90 and 90
- `longitude`: Required, valid number between -180 and 180

### 2. List Schools by Distance

**Endpoint:** `GET /schools?lat={latitude}&lng={longitude}`

**Query Parameters:**
- `lat` (required): User's latitude
- `lng` (required): User's longitude

**Example:** `GET /schools?lat=28.7041&lng=77.1025`

**Response:**
```json
[
  {
    "id": 1,
    "name": "ABC Public School",
    "address": "123 Main Street, Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance_km": 0
  },
  {
    "id": 2,
    "name": "XYZ High School",
    "address": "456 Park Lane, Delhi",
    "latitude": 28.5355,
    "longitude": 77.3910,
    "distance_km": 30.5
  }
]
```

The schools are automatically sorted by distance (closest first).

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## 🧮 Distance Calculation

The API uses the **Haversine formula** to calculate the great-circle distance between two points on Earth given their latitude and longitude coordinates. This provides accurate distance measurements in kilometers.

## 🛡️ Error Handling

The API includes comprehensive error handling for:
- Invalid input validation
- Database connection errors
- Missing required parameters
- Malformed requests

Example error response:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "latitude",
      "message": "Latitude must be between -90 and 90"
    }
  ]
}
```

## 🚀 Deployment

This backend can be deployed on various platforms:

### Recommended Platforms:
- **Vercel** (with Neon DB)
- **Netlify Functions** (with Neon DB)
- **Render**
- **Railway**
- **Fly.io**
- **Heroku**

### Environment Variables for Production:
```env
DATABASE_URL=your_neon_database_url
PORT=3000
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Neon Database Documentation](https://neon.tech/docs)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## ❓ FAQ

**Q: How accurate is the distance calculation?**
A: The Haversine formula provides very accurate results for most practical purposes, with accuracy within 0.5% for distances up to a few hundred kilometers.

**Q: Can I use a different database?**
A: Yes, you can modify the database connection in `src/database/db.js` to use any PostgreSQL-compatible database.

**Q: What's the maximum number of schools I can store?**
A: There's no hard limit imposed by the application. The limit depends on your database plan and server resources.

---

Made with ❤️ using Node.js, Express, and PostgreSQL