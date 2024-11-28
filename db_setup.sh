kubectl get pods
#Restore the backup by copying the file to the container and running the psql command
kubectl cp backup.sql <postgres-pod-name>:/backup.sql
kubectl exec -it <postgres-pod-name> -- psql -U ecommerce_user -d ecommerce_db -f /backup.sql
