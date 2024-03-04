# Motion Assessment App
## Simple App for connecting to a graph API endpoint

Design to re-run on failure every 2 seconds until softMax limit is hit, then exponential backoff is implemented
Graph API limit for Apps is 200 per hour per user so this prevents exceding maximum allowed calls

Can run in console with command (after npm install)
```
ts-node app.ts {ACCESS TOKEN}
```

Alternatively can be run by compiling first with
```
tsc app.ts
```
Then running
```
node app.js {ACCESS TOKEN}
```
