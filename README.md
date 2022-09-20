![maintained](https://img.shields.io/maintenance/no/2022?style=flat-square)
![version](https://img.shields.io/github/package-json/v/averwhy/Scouting2022?style=flat-square)
![react](https://img.shields.io/npm/v/react?color=61dbfb&label=react&style=flat-square)
![updated](https://img.shields.io/github/last-commit/averwhy/scouting2022?style=flat-square)
![commits](https://img.shields.io/github/commit-activity/w/averwhy/Scouting2022?color=gree&style=flat-square)
![stars](https://img.shields.io/github/stars/averwhy/Scouting2022?color=gold&style=flat-square)
# 2022 Scouting App | FIRST Robotics Team 138

This is our Scouting website for the 2022 game Rapid React.

### Frontend
Made with React.js and Reactstrap for the form component

### Backend
We use Firebase for our database


### How to run
First, create a `config.js` in the `/src/` directory. Use this layout:
```js
const config = {
firebase_key: "",
firebase_auth_domain: "",
firebase_project_id: "",
firebase_bucket: "",
firebase_messagingSenderId: "",
firebase_appId: "",
firebase_measurementId: "",
}

export default config;
```
You'll need a firebase project set up to fill out the values accordingly.
Then, run `npm i`. After that you should be all set to run `npm run start` to run the website locally.
If theres issues talk to a mentor and they can put you in touch with me.
