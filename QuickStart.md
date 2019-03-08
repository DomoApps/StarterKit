# QuickStart

This guide is least you need to do to get your app started. You may find this useful as a "cheat sheet", after completing and understanding the concepts taught in the [README](./README.md) guide.

### Clone the StarterKit
Clone and install the `with-data` branch of the StarterKit

```bash
git clone https://github.com/DomoApps/StarterKit.git
git checkout with-data
cd StarterKit
npm install
```


### Init
Choose **manifest only** when running the `domo init` command to start the process of initializing your Domo Custom App:

```bash
domo init
```

### Login and publish
Login to the correct Domo instance and publish your App. This will allow you to connect to your dataset locally when running `npm start`.

```bash
domo login
npm run deploy
```

### Startup
Startup the webpack server

```bash
npm run start
```

### Develop
Open `src/index.js` and change the lines indicated with `Step #` to use your dataset

### Publish
Once you have your App looking the way you want it locally you will need to publish your current version to your instance.

```bash
npm run deploy
```
