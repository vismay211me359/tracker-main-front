# Tracker Frontend

A modern Next.js application for tracking gym workouts and meals with a beautiful, responsive UI.

## 🚀 Features

- **Dynamic Form System**: Flexible forms that adapt to different tracking needs
- **Authentication**: Secure login/signup with JWT tokens
- **History Tracking**: View past entries with collapsible data structure
- **Responsive Design**: Beautiful UI built with Tailwind CSS and Radix UI
- **Real-time Updates**: Live data synchronization with backend

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Radix UI components
- **TypeScript**: Full type safety
- **State Management**: React hooks
- **Authentication**: JWT tokens with localStorage

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tracker-frontend.git
cd tracker-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your backend API URL

# Start development server
npm run dev
```

## 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
# For production: https://your-backend-api.railway.app
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **GitHub Integration** (Easiest):
   - Push your code to GitHub
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy automatically

2. **Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

### Environment Variables for Production

In your Vercel dashboard, add:
- `NEXT_PUBLIC_API_URL`: Your deployed backend URL

## 📁 Project Structure

```
tracker-frontend/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth-form.tsx     # Authentication component
│   ├── dynamic-form.tsx  # Main form component
│   └── history-view.tsx  # History display component
├── lib/                  # Utility functions
│   ├── api.ts           # API configuration
│   ├── data.js          # Form data structure
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔗 Backend

This frontend requires the tracker-backend API. Make sure to:
1. Deploy the backend first
2. Update `NEXT_PUBLIC_API_URL` with your backend URL
3. Configure CORS in backend to allow your frontend domain

## 📱 Features Overview

### Authentication
- Secure login and signup
- JWT token management
- Automatic token validation

### Dynamic Forms
- Flexible form structure from JSON data
- Multiple input types (text, switch, radio, etc.)
- Collapsible sections for better UX

### History Tracking
- View all past entries
- Collapsible data structure
- Date-based organization

## 🎨 UI Components

Built with:
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Custom UI Components**: Button, Card, Input, etc.

## 🚦 Getting Started

1. Make sure your backend is running
2. Update `.env.local` with correct API URL
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## 📄 License

MIT License - feel free to use this project for your own tracking needs!
