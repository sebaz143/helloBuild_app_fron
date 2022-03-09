# Features

- This React application is Single Page App with a login, signup page and a list of all the github repositoires of a user and star icon that let you choose your favorite repos and list them to easy acces. The frontend needs an API, the git repository of the backend is [backend](https://github.com/sebaz143/helloBuild_login_server "backend") .

- The application has a MongoDB database in [https://cloud.mongodb.com/](https://cloud.mongodb.com/) to save the user's data.

# Installation

1. clone the repo.

2. Go to helloBuild_app_fron

`cd helloBuild_app_fron`

3. install node packages:

`npm install`

4. create a .env file under helloBuild_app_fron folder with this content:

```markdown
REACT_APP_BACKEND=http://localhost:9500
```
5. run the ReactJS app with:

`npm start`
