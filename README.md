# 🌤️ Weather Service API

A NestJS-based weather and geocoding service powered by [Open-Meteo API](https://open-meteo.com). This is an example project demonstrating best practices for building production-ready backend services with NestJS.

## ✨ Features

- 🌍 **Weather Data** - Get current weather by city name or coordinates
- 🔍 **Geocoding** - Search cities and convert names to coordinates
- ⚡ **Redis Caching** - Automatic response caching for improved performance
- 🛡️ **Type Safety** - Zod validation for runtime type checking
- 📚 **API Documentation** - Interactive Swagger/OpenAPI docs
- 🏗️ **Modern Stack** - NestJS, TypeScript, Redis, native Fetch API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Redis server

### Installation

```bash
# Clone the repository
git clone https://github.com/kevinttran/weather-service.git
cd weather-service

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start Redis (macOS)
brew services start redis

# Start the application in development mode
npm run start:dev
```

### Access the API

- **API Base URL**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api

## 📖 API Endpoints

### Weather

#### Get Weather by City
```bash
GET /weather/city?city=London&temperatureUnit=celsius
```

**Query Parameters:**
- `city` (required) - City name
- `temperatureUnit` (optional) - `celsius` or `fahrenheit` (default: `celsius`)
- `windSpeedUnit` (optional) - `kmh`, `ms`, `mph`, or `kn` (default: `kmh`)
- `precipitationUnit` (optional) - `mm` or `inch` (default: `mm`)

**Example:**
```bash
curl "http://localhost:3000/weather/city?city=Tokyo&temperatureUnit=celsius"
```

#### Get Weather by Coordinates
```bash
GET /weather/coordinates?latitude=51.5074&longitude=-0.1278
```

**Query Parameters:**
- `latitude` (required) - Latitude (-90 to 90)
- `longitude` (required) - Longitude (-180 to 180)
- `temperatureUnit` (optional) - `celsius` or `fahrenheit`
- `windSpeedUnit` (optional) - `kmh`, `ms`, `mph`, or `kn`
- `precipitationUnit` (optional) - `mm` or `inch`

### Geocoding

#### Search Cities
```bash
GET /geocoding/search?name=London&count=5
```

**Query Parameters:**
- `name` (required) - City name to search
- `count` (optional) - Maximum results (1-100, default: 5)
- `language` (optional) - Language code (default: `en`)

## 🏗️ Project Structure

```
src/
├── cache/              # Redis cache configuration
│   └── cache.module.ts
├── common/             # Shared utilities
│   ├── dto/           # Common DTOs
│   ├── filters/       # Exception filters
│   └── pipes/         # Validation pipes (Zod)
├── geocoding/         # Geocoding module
│   ├── dto/
│   ├── schemas/       # Zod schemas
│   ├── geocoding.controller.ts
│   ├── geocoding.service.ts
│   └── geocoding.module.ts
├── weather/           # Weather module
│   ├── dto/
│   ├── schemas/       # Zod schemas
│   ├── weather.controller.ts
│   ├── weather.service.ts
│   └── weather.module.ts
├── app.module.ts      # Root module
└── main.ts            # Application entry point
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [NestJS](https://nestjs.com/) | Backend framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe programming |
| [Zod](https://zod.dev/) | Runtime validation |
| [Redis](https://redis.io/) | Response caching |
| [Swagger](https://swagger.io/) | API documentation |
| [Open-Meteo API](https://open-meteo.com/) | Weather data source |

## ⚙️ Configuration

Environment variables are configured in `.env`:

```env
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=3600
```

## 📝 Scripts

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Linting
npm run lint

# Testing
npm run test
npm run test:e2e
npm run test:cov
```

## 🌟 Key Features Demonstrated

### Zod Validation
All DTOs use Zod schemas for type-safe validation at runtime:
```typescript
export const GetWeatherByCitySchema = z.object({
  city: z.string().min(1, 'City name is required'),
  temperatureUnit: z.enum(['celsius', 'fahrenheit']).optional(),
});
```

### Redis Caching
Automatic caching with configurable TTL to reduce API calls:
```typescript
const cached = await this.cacheManager.get<WeatherResponse>(cacheKey);
if (cached) return cached;
```

### Swagger Documentation
Auto-generated API docs with decorators:
```typescript
@ApiOperation({ summary: 'Get weather by city name' })
@ApiResponse({ status: 200, type: WeatherDataDto })
```

## 📄 License

UNLICENSED - This is an example project for demonstration purposes.

## 🤝 Contributing

This is an example project, but feel free to fork and adapt it for your own use!

## 📧 Contact

Created by [Kevin Tran](https://github.com/kevinttran)
