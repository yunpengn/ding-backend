# Ding! Back-end

Some back-end codes written in Node.js (Firebase Cloud Functions) for Ding! and Ding! Stall iOS applications.

**[Ding! & Ding! Stall](http://isteps.comp.nus.edu.sg/event/12th-steps/module/CS3217/project/3) is participating in [12th STePS](http://isteps.comp.nus.edu.sg/event/12th-steps), a project showcase at [School of Computing](https://www.comp.nus.edu.sg), the [National University of Singapore](http://www.nus.edu.sg).<br>**

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

## Feature Description

#### Firebase Cloud Function `orderChange`

This function is trigger whenever there is change to any direct child node of the `orders/` node.
- If there is a new order inserted, it will increment the corresponding `stall_overview` node by 1; 
- if there is an existing order deleted (usually because of being moved to `order_history/`),  decrement by 1.

## Licence

[GNU General Public Licence 3.0](LICENSE)