# Blog Burst

Blog Burst is a full-stack blog application that allows users to create, view, and manage blog posts. The application includes user authentication, real-time updates, and AI-assisted blog creation.

![Blog Burst Logo](./frontend/src/assets/icon.png)

## 🔗 Live Demo

Visit the live application: [Blog Burst](https://blogburst.onrender.com)

## ✨ Features

### Authentication
- User signup with email and password
- Secure login/logout functionality
- Password reset via email
- JWT-based authentication
- Protected routes

### Blog Management
- Create, read, update, and delete blogs
- Public blog listing with pagination
- User dashboard for managing personal blogs
- Rich text editor for blog content
- Search functionality

### Special Features
- **AI-Assisted Blog Creation**: Generate blog content using OpenAI integration
- **Real-time Updates**: Live updates when blogs are created, edited, or deleted using Socket.io
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Navigation Guards**: Prevents accidental loss of unsaved changes

## 🛠️ Technologies Used

### Frontend
- React 19
- React Router Dom 7 for navigation
- Zustand for state management
- Axios for API requests
- Socket.io-client for real-time updates
- Tailwind CSS & DaisyUI for styling
- Lucide React for icons
- React Hot Toast for notifications
- Vite as the build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose for database
- JWT for authentication
- bcrypt for password hashing
- Socket.io for real-time updates
- Nodemailer for email functionality
- OpenAI API for AI-assisted content generation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/blog-burst.git
cd blog-burst
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Email configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com

# OpenAI configuration
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

## 📂 Project Structure

```
blog-burst/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── lib/               # Utility functions & services
│   │   ├── middlewares/       # Express middlewares
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   └── index.js           # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── assets/            # Images and other assets
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utility functions
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand stores
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   └── package.json
│
└── package.json               # Root package.json
```

## 🌟 Key Features In-Depth

### Authentication System
The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies to prevent XSS attacks, and CSRF protection is implemented. Password reset functionality sends a secure reset link to the user's email.

### Blog Management
Users can create, edit, view, and delete their blogs. All blogs are stored in MongoDB and can be retrieved with pagination. The public view shows all blogs from all users, while the user dashboard displays only the logged-in user's blogs.

### AI Content Generation
Users can generate blog content using the OpenAI integration. They can provide a topic or prompt, and the AI will generate a complete blog post with a title and content. Users can then edit this content before publishing.

### Real-time Updates
The application uses Socket.io to provide real-time updates. When a user creates, edits, or deletes a blog, the changes are immediately reflected for all connected users without requiring a page refresh.

## 📱 Responsive Design

The application is fully responsive, providing an optimal user experience on devices of all sizes:
- Desktop: Full layout with sidebar
- Tablet: Adjusted layout with collapsed sidebar
- Mobile: Fully mobile-friendly UI with hamburger menu

## 👨‍💻 Development Notes

### Code Organization
- Frontend follows a component-based architecture
- Backend uses the MVC pattern
- API follows RESTful conventions

### State Management
Zustand is used for state management on the frontend, providing a simple and efficient way to manage global state without the boilerplate of Redux.

### API Security
- JWT authentication for protected routes
- Password hashing with bcrypt
- HTTP-only cookies
- CSRF protection
- Rate limiting

## 🔒 Security Features

- Protected routes requiring authentication
- Secure password storage with bcrypt
- JWT stored in HTTP-only cookies
- CSRF protection
- Input validation and sanitization
- Proper error handling

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created by Mayank Sharma

## 🙏 Acknowledgements

- [Render](https://render.com) for hosting
- [OpenAI](https://openai.com) for the AI integration
- [DaisyUI](https://daisyui.com) for UI components
- [Lucide Icons](https://lucide.dev) for the beautiful icons
