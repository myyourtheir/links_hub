fuser -k 3010/tcp
docker-compose -f docker-compose.dev.yaml up &
cd RN/ 
npx expo start -a