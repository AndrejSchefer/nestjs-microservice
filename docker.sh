NAME=demo-nestjs-microservice-andrejschefer

npm run build

docker build -t schefer/alpina/$NAME .

docker tag schefer/alpina/$NAME repo.andrejschefer.de/schefer/alpina/$NAME

docker push repo.andrejschefer.de/schefer/alpina/$NAME

POD=$(kubectl  get pod -n $NAME -o name)

kubectl delete  $POD -n $NAME

kubectl create secret generic db-user-pass --from-file=./secrets/username.txt   --from-file=./secrets/password.txt --from-file=./secrets/db-host.txt --from-file=./secrets/db-name.txt  -n $NAME

kubectl create secret generic jwt-secret --from-file=./secrets/jwt_secret.txt -n $NAME

kustomize build k3s/base/. | kubectl apply  -f -

kubectl get pod,svc,ingress,secrets,pvc,configmap,certificate,sa -o wide  -n $NAME
