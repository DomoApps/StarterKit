# QuickStart

This guide is the minimum you need to do to get your Phoenix Custom App published. You may find this useful as a "cheat sheet", after completing and understanding the concepts taught in the [README](./README.md) guide.

### Clone the StarterKit
Clone and install the `with-data` branch of the StarterKit

```bash
git clone https://github.com/DomoApps/StarterKit.git
cd StarterKit
git checkout with-data
npm install
```


### Init
Choose **manifest only** when running the `domo init` command:

```bash
domo init
```

### Edit your manifest
Refer to the Dev Studio [Manifest](https://developer.domo.com/docs/dev-studio-references/manifest) page if needed.
- Open `manifest.json`
- Change the `height` and `width`
- Add a column `alias` for columns you plan to query that have spaces or long names
- Save the file


### Login and publish
Login to the correct Domo instance and publish your App. This will allow you to connect to your dataset locally when running `npm start`.

```bash
domo login
npm run deploy
```

### Startup
Startup the webpack server

```bash
npm start
```

### Develop
Open `src/index.js` and change the lines indicated with `Step #` to use your dataset

1. Set datasetAlias to use the same name in your manifest
1. Set the column "name" and "type" to columns in your dataset
1. Set a chart type using the correct [enum](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties)
1. Set your [Chart Options](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api)

### Publish
Once you have your App looking the way you want it locally you will need to publish your current version to your instance.

```bash
npm run deploy
```
