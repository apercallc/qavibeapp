#!/bin/bash

# QAVibe Development Startup Script

echo "🚀 Starting QAVibe Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if documentation dependencies are installed
if [ ! -d "documentation/node_modules" ]; then
    echo "📚 Installing documentation dependencies..."
    cd documentation && npm install && cd ..
fi

# Check if SQLite database exists, create sample data if not
if [ ! -f "blog.db" ]; then
    echo "🗄️ Creating initial database..."
fi

echo ""
echo "🎯 Starting servers..."
echo ""

# Start the backend server in the background
echo "🔧 Starting backend server (port 3001)..."
npm run blog:start &
BACKEND_PID=$!

# Start the API server in the background
echo "🔧 Starting API server (port 3002)..."
npm run api:start &
API_PID=$!

# Start the documentation server in the background
echo "📚 Starting documentation server (port 3003)..."
cd documentation && npm start &
DOCS_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start the frontend server
echo "🌐 Starting frontend server (port 8002)..."
echo ""
echo "✅ Servers running:"
echo "   • Frontend: http://localhost:8002"
echo "   • Blog API: http://localhost:3001"
echo "   • Forms API: http://localhost:3002"
echo "   • Documentation: http://localhost:3003/docs/"
echo "   • Blog: http://localhost:8002/blog.html"
echo "   • Support Form: http://localhost:8002/support.html"
echo "   • Documentation Portal: http://localhost:8002/docs-portal.html"
echo ""
echo "📖 Admin login: password is 'admin123'"
echo "📚 Documentation includes TestFlux and StackHealth guides"
echo ""
echo "Press Ctrl+C to stop all servers"

# Start frontend (this will block)
npm run serve

# When frontend stops, kill all background processes
echo "🛑 Stopping servers..."
kill $BACKEND_PID 2>/dev/null
kill $API_PID 2>/dev/null
kill $DOCS_PID 2>/dev/null
echo "✅ All servers stopped."
