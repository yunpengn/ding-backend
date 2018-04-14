# Ding! Back-end

Some back-end codes for Ding! and Ding! Stall iOS applications

## How to setup the project

- Make sure you have the latest version of [Node.js](https://nodejs.org/) and [Npm](https://www.npmjs.com), latter of which should be shipped with the former.
- Install the Firebase command-line tools by
```bash
npm install -g firebase-tools
```
- Make sure you have access to the desired Firebase Project.
- Run `firebase login` to gain access to the project.

## How to develop & deploy the app

- To deploy the cloud functions, use `firebase deploy --only functions` (make sure you have `firebase login` to gain access to your Firebase project).
	- If not working, try `firebase deploy --only functions --debug` to enable debug mode.
- To test functions triggered by database (or Firestore), use `firebase functions:shell` and supply with parameters.
- To test functions triggered by HTTP/HTTPS, use `firebase serve`.
	- If not working, try to run with admin mode by `sudo firebase serve`.

## Licence

[GNU General Public Licence 3.0](LICENSE)