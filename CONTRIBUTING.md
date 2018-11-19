# Contributing to Web Profiles

Thanks for contributing to Web Profiles by Digital Measures! Before contributing, please read the [Code of Conduct](CODE_OF_CONDUCT.md) and the rest of this document.

## Core ideas

We want to **reduce the overall complexity** required to use and contribute to this project. We want to maintain zero build steps for normal contributions to CSS and JavaScript. All CSS is **vanilla CSS** with hand-coded vendor prefixes as opposed to using [Autoprefixer](https://github.com/postcss/autoprefixer). Additionally, all JavaScript is **vanilla ECMAScript 5** code that doesn't need to run through [Babel](https://babeljs.io/). This makes using, sharing, and modifying this code easier for non-professional developers.

## Documentation updates

Improvements to the documentation are always welcome—please submit a pull request!

## Bug fixes

If you find a bug, please check the [issues](issues/) first to see if someone else has already reported it. If not, file an issue with detailed information on how to reproduce. If you know what the fix is, feel free to submit a pull request with the fix, otherwise we will address it appropriately.

## Feature requests

Before spending a lot of time working on a new feature and submitting a pull request, please file an issue describing the feature so it can be discussed openly and decided if it's a feature we'd like to add.

## Developer Certificate of Origin (DCO)

We ask that all contributors sign off on commits with the [Developer Certificate of Origin](https://developercertificate.org/). Compliance is automated using [Probot: DCO](https://github.com/probot/dco). Pull requests should come from a branch or forked repo.

Details on how to sign your commits from [probot/dco](https://github.com/probot/dco):

> Contributors sign-off that they adhere to these requirements by adding a Signed-off-by line to commit messages.
>
> ```
> This is my commit message
>
> Signed-off-by: Random J Developer <random@developer.example.org>
> ```
> Git even has a -s command line option to append this automatically to your commit message:
>
> ```
> $ git commit -s -m 'This is my commit message'
> ```

## Folder structure of Web Profiles

This projects uses a [Lerna monorepo](https://github.com/lerna/lerna) to manage multiple independent themes. Themes are found in the [`themes/`](/themes) directory.

## Coding guidelines

* **ECMAScript version 5:** Web Profile Themes are written in ES5-compliant JavaScript. This allows us to not require a build step and make it easier to copy and paste code into other environments that also do not use build systems. **Only use syntax and features available in ES5-compliant environments**.
* **Formatting:** We use [Prettier](https://prettier.io/) to auto-format code. Prettier **runs on a precommit hook**, so there should be no action needed to submit properly formatted code. If you want to manually run Prettier, use `npm run format` (or set up an editor plugin).
* **Linting:** We run a basic ESLint setup to ensure valid JavaScript and avoid common pitfalls. You can run a check with `npm run lint:js` to check for errors, or set up an editor plugin.

## Setting up a local copy

Web Profiles uses [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) for packaging and development. You do not need Node to use the theme JavaScript or CSS in this repo. However, if you want to contribute or create your own theme you will need to set up Node locally. With the project checked out, run `npm install` to install development dependencies.

### Running the server

A script has been provided for running a local server which will serve the JavaScript and CSS files as static assets. To run the server, use `npm start`.

This will start a server at `localhost:3000`, with the `themes` directory as the server root. For example, the `tabbed.js` file will be available at `http://localhost:3000/tabbed/tabbed.js`

### Previewing a local theme

While developing a theme, follow these instructions for hooking up your local assets with an instance of the `dm-web-profiles` front-end.

1. Log in to Digital Measures by Watermark
2. Navigate to an existing web profile report, or create and save a new report with the web profile option enabled.
3. Inside the report builder, open the `Embed` modal under `Options` -> `Web Profiles`
4. Select a non-`Default` theme. This will result in the following being added to the generated code:
    - An include statement for the theme JavaScript asset
    - An include statement for the theme CSS asset
    - A `theme` variable passed in to the `showProfile` function
5. Click `Download HTML`
6. Open the saved HTML file in a text editor of your choice
7. Make the following revisions:
    - Replace the theme JS asset with one to be served locally
    - Replace the theme CSS asset with one to be served locally
    - Replace the `theme` passed in to `showProfile` with the local Theme ID
    - Example snippet using a Theme ID "tabbed":
      ```html
      <link rel="stylesheet" type="text/css" href="https://cfcdn.digitalmeasures.com/dm-web-profiles/v1/css/main.css" />
      <link rel="stylesheet" type="text/css" href="http://localhost:3000/tabbed/tabbed.css" />
      <script src="https://cfcdn.digitalmeasures.com/dm-web-profiles/v1/js/main.js"></script>
      <script src="http://localhost:3000/tabbed/tabbed.js"></script>

      <script>
        window.dmWebProfiles.showProfile({
          environment: 'sprint',
          container: '#dm-web-profile-root',
          clientId: 'a0454dad-c52f-426f-8f45-f0e487f95444',
          reportId: 'f8a61015-dcb7-42a3-a4dd-570c197a9524',
          username: 'afuger',
          theme: 'tabbed'
        });
      </script>
      ```
8. Start your local server (`npm start`), if not currently running
9. Open your revised HTML file in a web browser
