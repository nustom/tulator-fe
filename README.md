# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Feature

### Tech stack

- React/React router v6
- Redux toolkit for state management
- Redux Toolkit Query to interact with the server (for base client, I use axios)
- Ant design UI framework to build the application
- TypeScript
- Morphism to transform the data between client/server. This is useful for implementing custom data from many server/third party.

### Auth
The Auth feature allows you to authenticate users with their identity and password, I have written an example async logic to handle a fake authentication request and demo "async thunk", we can integrate with a real authentication API later.

The `PrivateRoute` will allow an authenticated user to access the protected page using react-router-dom v6, we can customize their role to archive the RBAC authorization.

### Topic
This feature is the main feature of the application. It allows you to create a topic with a number and a list of operation. I used the antd component to building the beautiful UI.

I am also using RTK Query to demo how to replace a RTK slice with a RTK query and auto-generated hooks.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
