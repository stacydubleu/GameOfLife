# John Conway's Game of Life Implemented in React

## Steps to run locally after cloning the repo:

`npm install`
`npm run start`

## Live link here:

https://stacydubleu.github.io/game-of-life/

<img src="https://raw.githubusercontent.com/stacydubleu/game-of-life/main/public/screenshot.png" width="250" height="auto">

## Steps for deploying to [Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

1. Add [`gh-pages`](https://github.com/tschaub/gh-pages) to dependencies

```shell
  $ npm install gh-pages --save-dev
```

2. Add a `homepage` property in this format\*: `https://{username}.github.io/{repo-name}`

```
 "name": "gameoflife",
  "version": "1.0.0",
  "homepage": "https://stacydubleu.github.io/game-of-life",
  "description": "",
  "main": "index.js",
```

3. Add deploy and predeploy scripts to `package.json`

```
 "scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d  dist",
  "start": "webpack serve --mode=development",
  "build": "webpack",
  ...
```

5. Add a "[remote](https://git-scm.com/docs/git-remote)" that points to the repository

```shell
  $git remote add origin https://github.com/{username}/{repo-name}.git
```

6. Push the app up to the repository via `deploy` script

```shell
  $npm run deploy
```

7. Navigate to "settings" in the repository and to "pages" and make the following configurations:
   1. **Source**: Deploy from a branch
   2. **Branch**:
      - Branch: `gh-pages`
      - Folder: `/ (root)`
