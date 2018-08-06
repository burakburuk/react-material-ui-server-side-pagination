# plentific-frontend
A single-page app using React.js and the Zoopla API with auto complete, server side pagination and sorting features. 

You will need to open chrome in unsecure mod since server does not send necessary header "allow cross domain requests"
Here is the command for starting chrome as unsecure in OSX 
open -a Google\ Chrome --args --disable-web-security --allow-running-insecure-content

In order to run project, run following commands npm install npm run start

Then it will automatically start the project from 3000 port and it will open default browser.

For the architectural choices I made;

I used react for managing components since I currently use it in my projects. I used redux for single source of truth and managing states since state management is not easy in pure react. I used redux-saga middleware for async operations instead of thunk since it uses callback. I used material ui 1.4 for react ui components since it is stable and used to do. I used create-react-app for template project since it is easy to configure. (Webpack, express, babel, etc)

Regarging to requirements; I've developed a single page application that presents a list that shows the properties list within given filters Min price, Min beds and the Location data. They are mandatory and it gives message when you do not fill them. There is a dropdown for sorting purpose but listing_id ascending sorting is not working because of the endpoint. Here is my request -> https://api.zoopla.co.uk/api/v1/property_listings?area=aberdeen&minimum_price=140000&minimum_beds=5&page_number=0&page_size=20&order_by=listing_id&ordering=ascending&api_key=dfdz5hck8anunvtqjeva6ys3

Other sort requests work properly.

Server side paging has been implemented since it is provided by endpoint. (Requesting all the data to client and doing pagination over data is not the proper way in this scenerio) You can customize page sizes with dropdown bottom as 10,20,50 default 20.

Application is served under https://glacial-lake-66353.herokuapp.com

Note: create-react-app did not push the code as production to heroku, I couldnt do that but I configured the project as deployable. npm run build does that.
