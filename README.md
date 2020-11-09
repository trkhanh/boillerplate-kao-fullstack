# Full-Stack JavaScript Architecture 
Opinionated project architecture for Full-Stack JavaScript Applications.

## About
Using JS for full-stack has alway been challenge especially with architecting various pieces of the application, choosing technologies and managing devOps. This project provides a base typical project consisting a Landing website, Web and Mobile Application, API services and easy deployment of these services. This project uses a micro-services architecture where all individual project runs as a services (container)

A typical product (SaaS, etc.) usually consists of following services:
* Landing page
    - Used for introducing your business to customers
    - Provide links to download the mobile application
    - Provide link to access web application
    - Contact page
    - Privacy policy page
    - Terms of use page
    - SEO friendly (should support server side rendering)
* Web Application
    - Your actual application for your customers to use
    - Desktop browser
    - Tablet and mobile browser via responsive design. 
* Mobile Application
    - Your actual application for your customers to use
    - Android (Mobile/Tablet)
    - iOS (Mobile/Tablet)

## Core structure
```
solution
  ├── backend
  │   ├── api
  │   │   > NodeJS
  │   │   > PORT 8000
  │   │   > api.example.com
  │   │
  │   ├── database
  │   │   > MongoDB
  │   │   > PORT 27017
  │   │
  │   └── proxy
  │       > NGINX
  │       > PORT 80 / 443
  │
  ├── deployment
  │   > Docker Compose
  │
  ├── frontend
  │   ├── app
  │   │   ├── mobile
  │   │   │   > React Native
  │   │   │   > iOS (Apple App Store)
  │   │   │   > Android (Google Play Store)
  │   │   │
  │   │   └── web
  │   │       > React
  │   │       > Single page application
  │   │       > PORT 5000
  │   │       > app.example.com
  │   │
  │   └── landing
  │       > React
  │       > Server side rendered
  │       > PORT 3000
  │       > example.com
  │
  └── README.md (you are here)
```

## Stack
* Landing
    - NodeJS
    - Express
    - React
    - React Router
    - Server Side Rendering
    - Material UI
* Web
    - React
    - Redux
    - React Router
    - Material UI
* Mobile (iOS, Android)
    - React Native
    - Redux
    - React Navigation

## Deployment
* Technologies
    - Docker
    - Docker compose

## Setup and Running
* Prerequisites
    - Node (v10.x)
    - MongoDB (v4.x)
    - Xcode (for iOS) (latest)
    - Android Studio (for Android) (latest)
    - Follow React Native Guide to setup your local machine
* Clone repository git clone git@github.com:trkhanh8/fullstack-javascript-architecture.git fullstack
* API
    * Info
        - [ ] Authentication strategy: [JWT]('https://jwt.io/introduction/') (JSON Web Token)
        - [ ] Uses [RPC]('https://www.jsonrpc.org/') (Remote Procedure Call) for API endpoints (one endpoint URL, multiple operations)
        - Resources
            - [ ] Lightweight RPC API pattern https://github.com/atulmy/wispy
    * Switch to api directory cd backend/api
    * Configuration
        - Create local environment file cp `.env.dev.example` `.env.local`
        - Modify `.env.local` for
            - `PORT` (8000)
            - `NODE_ENV` (development | production)
            - `SECURITY_SECRET` (Use [passwordsgenerator]('https://passwordsgenerator.net/'))
            - `SECURITY_SALT_ROUNDS` (10)
            - `MONGO_URL` (mongodb://localhost:27017/example)
            - `LANDING_URL` (http://localhost:3000)
            - `WEB_URL` (http://localhost:5000)
            - `API_URL` (http://localhost:8000)
            - `EMAIL_ON` (0 | 1 (in development, you can toggle to send emails or not))
            - `EMAIL_TEST` (send test emails to this address)
            - `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASSWORD` (use any email service, eg. mailgun.com and get credentials to start sending emails
    * Setup
            - Install packages and seed database npm run setup
    * Run
            - Start API server: npm start (http://localhost:8000)
* Landing
    - Switch to landing directory cd frontend/landing
    - Configuration
        - Create local environment file cp `.env.dev.example` `.env.local`
        - Modify `.env.local` for
            - `PORT` (3000)
            - `NODE_ENV` (development | production)
            - `URL_LANDING` (http://localhost:3000)
            - `URL_WEB` (http://localhost:5000)
            - `URL_API` (http://localhost:8000)
            - `GA_TRACKING_ID` (Google analytics tracking ID)
            - Setup
            - Install dependencies: `npm install`
            - Run
            - Start Landing server: npm start, browse at http://localhost:3000
            - Resources
            - Use getterms.io to generate Privacy Policy / Terms of Use
            - Favicon generator [realfavicongenerator](https://realfavicongenerator.net/)
* Web
    - Switch to web directory cd frontend/app/web
    - Configuration
        - Create local environment file cp `.env.dev.example` `.env.local`
        - Modify `.env.local` for
            - `PORT` (5000)
            - `REACT_APP_LANDING_URL` (http://localhost:3000)
            - `REACT_APP_WEB_URL` (http://localhost:5000)
            - `REACT_APP_API_URL` (http://localhost:8000)
            - Setup
            - Install dependencies: npm install
            - Run
            - Start Web server: npm start, browse at http://localhost:5000
* Deployment
    * Deploy code
        1. Login to the server (SSH)
        2. Create a new directory on server: `mkdir /var/www/fullstack` and switch to the directory `cd /var/www/fullstack`
        3. Clone repository git clone `git@github.com:trkhanh8/fullstack-javascript-architecture.git` .
        4. Switch to `deployment` directory cd `deployment`
        5. Build containers `docker-compose up --build -d`
            - `up` = Builds, (re)creates, starts, and attaches to containers for a service.
            - `--build` = Build images before starting containers
            - `-d` = Detached mode: Run containers in the background, print new container names
        
    * Resources [- Set Up Free SSL Certificates from Let's Encrypt using Docker and Nginx 6](https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx). 

    * Re-deploy with following steps: - Change directory `cd /var/www/fullstack` - Pull latest code git pull - Rebuild containers: `docker-compose up --build -d`

* Mobile
    * Switch to mobile directory `cd frontend/app/mobile`
    * Configuration
        * Modify `src/setup/config/env.js` for
            - `APP_ENV` (development | production)
            - `LANDING_URL` (http://<your local network IP>:3000)
            - `WEB_URL` (http://<your local network IP>:5000)
            - `API_URL` (http://<your local network IP>:8000)
            - Tip: use `ifconfig` on macOS or Linux to get your local IP address
    * Setup
        * Install dependencies: npm install
    * Run
        * **iOS** `react-native run-ios --simulator='iPhone 8'`
        * **Android** `react-native run-androi`d (connect your Android phone via USB or use already created simulator with name `Mobile_-_5` by running `cd ~/Library/Android/sdk/tools && ./emulator -avd Mobile_-_5`)
    * Publish
        * **Android**
            - Build: `cd android && ./gradlew assembleRelease && cd ...`
            - Upload` frontend/app/mobile/android/app/build/outputs/apk/release/app-release.apk` to Play Store.
        * **iOS**
            - Build: Open frontend/app/mobile/ios/example.xcodeproj in Xcode` -> Choose Generic iOS Device (top left) -> Product (top menu) -> Archive.
            - Upload using Archiver (will open automatically once Archive is complete)
    * Resources
        - [From react-native init to app stores real quick](https://blog.elao.com/en/dev/from-react-native-init-to-app-stores-real-quick/)
        - iOS App icon and splashscreen generator [appicon](https://www.fanstudio.co.uk/appicon/)
        - Icon generator [makeappicon](https://makeappicon.com/)
        - Icons and splashscreen generator imagegorilla
    ## Authors
    - 👩‍💻Tran Khanh [trkhanh8@gmail.com](mailto:trkhanh8@gmail.com) 
