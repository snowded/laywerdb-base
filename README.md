# Law Office Management System -- Made by snoww.

A modern, elegant law firm management system built with React, TypeScript, and MongoDB. Features a beautiful dynamic island-inspired navigation and a dark theme UI.

![Law Office Management System](https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200)

## Features

- 👥 **Client Management**
  - Store and manage client information
  - Search and filter clients
  - View detailed client profiles

- 📁 **Case Management**
  - Track case status and priority
  - Link cases to clients
  - Monitor important dates and deadlines

- 📅 **Appointment Scheduling**
  - Schedule and manage appointments
  - Link appointments to clients and cases
  - Track appointment status

- 🎨 **Modern UI/UX**
  - Dynamic island-inspired navigation
  - Responsive design
  - Dark theme with beautiful gradients
  - Smooth animations and transitions

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router DOM

- **Backend**
  - Node.js
  - Express
  - MongoDB with Mongoose
  - CORS

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/law-office-management.git
   cd law-office-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── models/         # MongoDB schemas
├── pages/          # Page components
├── server/         # Express server setup
└── lib/           # Utility functions
```

## API Endpoints

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Cases
- `GET /api/cases` - Get all cases
- `GET /api/cases/:id` - Get case by ID
- `POST /api/cases` - Create new case
- `PUT /api/cases/:id` - Update case
- `DELETE /api/cases/:id` - Delete case

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by iOS Dynamic Island
- Icons provided by [Lucide](https://lucide.dev/)
