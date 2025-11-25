# Quick Start Guide

## Start Redis

Make sure Redis is running:

```bash
# Using Homebrew (macOS)
brew services start redis

# Or run Redis in a container
docker run -d -p 6379:6379 redis:alpine
```

## Install and Run

```bash
# Install dependencies (if not already done)
npm install

# Create .env file
cp .env.example .env

# Start the application in development mode
npm run start:dev
```

## Test the API

Once running, visit:
- API Documentation: http://localhost:3000/api
- Test endpoint: http://localhost:3000/weather/city?city=London

## Example Requests

### Get Weather by City
```bash
curl "http://localhost:3000/weather/city?city=London"
curl "http://localhost:3000/weather/city?city=Tokyo&temperatureUnit=celsius"
curl "http://localhost:3000/weather/city?city=New%20York&temperatureUnit=fahrenheit"
```

### Get Weather by Coordinates
```bash
curl "http://localhost:3000/weather/coordinates?latitude=51.5074&longitude=-0.1278"
```

### Search Cities
```bash
curl "http://localhost:3000/geocoding/search?name=London&count=5"
curl "http://localhost:3000/geocoding/search?name=Paris"
```
