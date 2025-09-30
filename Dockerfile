FROM python:3.12-slim

# Install uv
RUN pip install --no-cache-dir uv

# Set workdir
WORKDIR /app

# Copy dependency definitions
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv pip install --system .

# Copy the actual app code
COPY app/ /app

# Expose FastAPI port
EXPOSE 8000

# Run the app (adjust if your entrypoint is not main.py)
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
