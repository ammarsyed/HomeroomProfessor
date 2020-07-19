# HomeroomProfessor

node modules has express, body-parser, mongoose, concurrently, and nodemon at the moment

client folder is the frontend. everything ourside is backend stuff. 
data base schema models are in the models folder
client>src>components will have the react components

From the project directory (directory that has server.js and the folders) run these commands to start stuff:

**The first time you clone the repo, you need to run npm install in the directory that has server.js, it's configured in a way that will install both the backend/server node modules as well as the frontend/client node modules**

npm start from the directory with server.js will start the backend server (won't need to use ever)



**Starting Server and Client**

(7/6/20)

--**npm run server** from the directory with server.js will start the backend server using nodemon so you won't have to restart server when changes are done, just refresh

--**npm run client** from the directory with server.js will start the frontend(client)

--**npm run dev** from the directory with server.js will start both frontend and server (backend)

(7/19/20)

--Backend and Frontend are now connected, two terminals will need to be ran for server and client.

--**npm start** from inside directory /client/ will launch the server connected to MongoDB.

--**npm start** from inside directory /client/ will launch the web app.

** Misc. Notes **

--There seems to be an image issue with the gator picture if using safari, use google chrome for now.

