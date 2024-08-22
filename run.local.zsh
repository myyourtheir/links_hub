fuser -k 3010/tcp
cd nest/ 
npm run start:dev &
cd ../RN/ 
npx expo start -a