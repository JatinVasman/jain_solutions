#!/usr/bin/env bash
set -e

echo "=== Initializing Rental Marketplace Development Environment ==="

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "Error: Node.js 20 or higher is required. Detected: $(node -v)"
  exit 1
fi

# Ensure .env exists
if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
fi

# Install dependencies
echo "Installing monorepo dependencies with pnpm..."
pnpm install

# Generate Prisma Client
echo "Generating Prisma client..."
pnpm --filter @rental-platform/api prisma:generate

echo "=== Setup complete! Start development with 'pnpm dev' ==="
