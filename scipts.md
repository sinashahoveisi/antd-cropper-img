# explain scripts

  ```json
  {
  "scripts": {
    "bootstrap": "lerna bootstrap",
    "publish": "lerna publish",
    "link": "lerna link",
    "changed": "lerna changed",
    "start": "lerna run --parallel start",
    "build": "lerna run build --scope antd-cropper-img",
    "clean": "lerna run clean --scope antd-cropper-img",
    "clean:all": "lerna clean",
    "watch": "lerna run watch --scope antd-cropper-img",
    "package": "lerna exec --scope antd-cropper-img -- npm pack"
  }
  }
  ```
- Bootstrap the packages in the current Lerna repo. Installing all their dependencies and linking any cross-dependencies.
```sh
npm run bootstrap
```
- Create a new release of the packages that have been updated. Prompts for a new version and updates all the packages on git and npm.
```sh
npm run publish
```
- Symlink together all Lerna `packages` that are dependencies of each other in the current Lerna repo.
```sh
npm run link
```
- Check which packages have changed since the last release.
```sh
npm run changed
```
- Remove all `antd-cropper-img-*.tgz` file from antd-cropper-img package.
```sh
npm run clean
```
- Remove the `node_modules` directory from all packages.
```sh
npm run clean:all
```