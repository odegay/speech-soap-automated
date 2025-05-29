FROM python:3.11-slim
WORKDIR /app
COPY src/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY src ./src
ENV PYTHONPATH=/app/src \
    FLASK_HOST=0.0.0.0 \
    FLASK_PORT=8080
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:8080/api/health || exit 1
CMD ["python", "-m", "src.backend.app"]
