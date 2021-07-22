## Build Setup

# install the packages with npm
cd react-crm
npm install

# config gmail IMAP
"\src\server\index.js"

let mailServer1 = new Imap({
    user: 'yourgmail@gmail.com',
    password: 'yourgmailpass',
    host: 'imap.gmail.com',
    port: 993,
    tls: false,
    tlsOptions: {
      rejectUnauthorized: false
    },
    authTimeout: 3000
  }).once('error', function (err) {
    console.log('Source Server Error:- ', err);
  });
  
# setting get_email api url
"\src\middleware\api.ts"
return axios.get(`http://localhost:8080/getEmailCrm`)
  change "localhost" to new server URL

# start the server with hot reload at localhost:3000
npm start
# or yarn
yarn start

# start api getmail server
node src\server

## build for production
npm run build

## Docker 

```bash
## Run / Test release without building new image
npm run build

# Launch nginx image to test latest release
docker pull nginx:alpine
docker run -p 8080:80 -v \
    <your_aboslute_path>/dist:/usr/share/nginx/html nginx:alpine


# Build release image
docker build . -t  rc-prd:2.0

# Launch the development image in the backgroud
docker run -d --publish 8080:80  --name rc2 rc-prd:2.0

# Check the log
docker logs rc2  -f
```
