#!/bin/bash

DOCKER_USERNAME="tim299"
SERVICES=("api-gateway" "cart-service" "order-service" "product-service" "frontend")

# Generate a unique tag using the current timestamp or Git commit hash
TAG=$(date +%Y%m%d%H%M%S) # Use a timestamp
# TAG=$(git rev-parse --short HEAD) # Use Git commit hash

for SERVICE in "${SERVICES[@]}"; do
  echo "Building and pushing image for $SERVICE with tag $TAG..."

  docker build -t "$DOCKER_USERNAME/$SERVICE:$TAG" "./$SERVICE"
  if [ $? -eq 0 ]; then
    echo "Successfully built $DOCKER_USERNAME/$SERVICE:$TAG"
  else
    echo "Failed to build $DOCKER_USERNAME/$SERVICE:$TAG"
    exit 1
  fi

  docker push "$DOCKER_USERNAME/$SERVICE:$TAG"
  if [ $? -eq 0 ]; then
    echo "Successfully pushed $DOCKER_USERNAME/$SERVICE:$TAG"
  else
    echo "Failed to push $DOCKER_USERNAME/$SERVICE:$TAG"
    exit 1
  fi

  # Update the Kubernetes deployment YAML dynamically
  sed -i "s|image: $DOCKER_USERNAME/$SERVICE:.*|image: $DOCKER_USERNAME/$SERVICE:$TAG|" kubernetes-deployment.yaml
done

echo "All images built, pushed, and YAML updated successfully!"

# Reapply the updated Kubernetes configuration
kubectl apply -f kubernetes-deployment.yaml
