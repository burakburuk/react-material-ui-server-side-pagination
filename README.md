# plentific-frontend
A single-page app using React.js and the Zoopla API with auto complete, server side pagination and sorting features. 

In order to run project, run following commands npm install npm run start

Then it will automatically start the project from 3000 port and it will open default browser.

React is used for managing components. Redux is used for single source of truth and managing states since state management is not easy in pure react. Redux-saga middleware is used for async operations instead of thunk since it uses callback. Material ui 1.4 is used for react ui components since it is stable and easy to.use. This app.created by using create-react-app for template project since it is easy to configure. (Webpack, express, babel, etc)

It is a single page application that presents a list that shows the properties list within given filters Min price, Min beds and the Location data. They are mandatory and it gives message when you do not fill them. There is a dropdown for sorting purpose.

Other sort requests work properly.

Server side paging has been implemented since it is provided by endpoint. (Requesting all the data to client and doing pagination over data is not the proper way in this scenerio) You can customize page sizes with dropdown bottom as 10,20,50 default 20.

Application is served under https://glacial-lake-66353.herokuapp.com
