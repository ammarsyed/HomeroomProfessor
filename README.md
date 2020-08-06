# HomeroomProfessor

##7/31/20 Overhaul for Heroku Sprint 2 Deployment (new instructions)

###**Scripts**

####Installing 

--**npm install** in the directory with the client and server FOLDERS. This directory also has a package.json and will be where your node modules for the server (backend) go.

--**npm install** inside the client directory will install nodemodules and stuff for the client (frontend)

####Running 

--**npm run server** in the directory with client and server folder will run the server via nodemon, refreshing server for any changes. 

--**npm start** in the directory with client and server folder will run the server via node. You will have to restart the server after any changes in the server/backend. 

--**npm start** in the client folder will start and launch the front end


--**npm run client** from the directory with client and server folder will start the frontend(client)

--**npm run dev** from the directory with the client and server folder will start both frontend and server (backend)

##8/6/20

1. Added picture, summary, availability, and zoom url to the professor schema. 
2. The professor registration page now is 2 pages where the second can submit and the first can return to login. Next/Previous buttons appear from a innerHTML change, not another component. 