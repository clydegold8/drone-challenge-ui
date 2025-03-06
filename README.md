# Bigdatr Control Panel UI (Front-end Code Challenge) 
 [![Playwright Tests](https://github.com/clydegold8/drone-challenge-ui/actions/workflows/playwright.yml/badge.svg)](https://github.com/clydegold8/drone-challenge-ui/actions/workflows/playwright.yml)
-  This repo contains the control panel UI for the Bigdatr drone. This will show the intuitive UI for providing instructions to the drone remotely through API.

## Installation Guide
 - clone this repo in your local 
```js
git clone https://github.com/clydegold8/drone-challenge-ui.git
```
- after cloning, install the required depedencies
```js
npm install
```
- Run the local server
```js
npm run dev
```
- You can access the local through
```js
http://localhost:5173
```
- You can run tests by this command
```js
npm run test
```
## App Short Manual Guide
- You can read the short manual on its [WIKI](https://github.com/clydegold8/drone-challenge-ui/wiki/App-Short-Manual-Guide)

## App Features (Implemented)
- App is created by React + TypeScript + Vite (SPA app)
- used Tailwind with Daisy UI libraries (Lightweight and Utility first CSS)
- used vanilla JS for composables (lightweight)
- Controller Directional Pads Interface
- Added console window to see inputed instructions and status using ```http://localhost:4001/instruct-drone?instructions=x^xv```
- Has Controller details to show if the drone has got the commands
- Has Result flight table for the successfull flights (flight sessions with billboard pictures)
- Has preview modal for each items on successfull flights table (shows billboard details using ```localhost:4001/get-billboard?id=5aba7bffddc4ecbbb81e7fad```
- Is using git flow for automated post commit test checks (check badge and commit check icon)
- Scalable on small devices
- E2E and Component Testing via [Playwright](https://playwright.dev) run ``` npm run test ```

## Nice to have features (productionise)
- Should able to save successfull flights (flight sessions with billboard pictures) to DB
- Able to retrieve and delete successfull flights
- sorting and pagination implementation on API and Front end specifically on tables
- use Axios or SWR for handling http calls
- Theme switcher (optional)
