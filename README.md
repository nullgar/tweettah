

# Introduction
[Tweettah](https://tweettah.herokuapp.com/) is a Twitter like clone, that allows users to post tweets, and comments on tweets. The project is built using React, Redux, Flask, Python and SQLAlchemy. You can discover, share and socialize on Tweettah.

# Feature list document

## Signup and Login

1. You can login in if you already have an account or as the demo user.


2. If you want to have your own account, please click sign up.


## Homepage

1. The homepage currently will display the tweets from all users in chronological order. I plan on implementing the ability to follow users and only see your tweets and the tweets from the users you are following.



## Creating a new Tweet

 1. Log In , Sign Up or Use the Demo User

 2. In the feed you will see an input field where you can enter your tweet


## Edit Tweet
If you are the owner of a tweet, you can edit your tweet.

1. Click on the tweet.

2. Click on the ```...``` icon on the tweet you want to edit.


3. Edit Tweet and hit Edit Tweet

## Deleting Image

1. If you are the owner of a tweet follow the previous instructions but click on the delete button

## Creating a Comment

1. Click on an tweet and it will take you to that individial tweet where you can enter your comment in the input field


## Edit a Comment

1. Click on the tweet where the comment is at.
2. Click on the ```...``` icon on your comment
3. Input the changes
4. Click on Submit

## Deleting a Comment

1. If you are the creator of a comment
2. Click on the view all message icon on the image
3. Click on the ```...``` icon on your comment
4. Click on Delete


# How to Install Application via Command Line



Go to [Repo](https://github.com/nullgar/tweettah)
 1. Copy Code Link


 2. Open up terminal and input  ```git clone 'Link from github'``` in your desired folder.



 3. Got to application by using ```cd /Folder Location```.



 4. Open Up Code in your IDE by using code . in the location folder.



 5. Open up the integrated terminal.



 6. In one terminal instances run NPM Install in the ```/frontend``` directories.




 7. In the backend terminal run: ```pipenv install```  then  ```pipenv run flask run ``` then ```flask db init && flask db migrate && flask db upgrade```



 8. In the react-app folder create a .env file and and input ```SECRET_KEY='your-secret-key-goes-here' DATABASE_URL=sqlite:///dev.db```


 9. In the front end terminal run **npm start**




# Link to WIKI and additional information

[Wiki](https://github.com/nullgar/tweettah/wiki)

[WireFrames](https://github.com/nullgar/tweettah/wiki/Wire-Frames)

[Feature List](https://github.com/nullgar/tweettah/wiki/Feature-List)

[Database Schema](https://github.com/nullgar/tweettah/wiki/Database-Schema)

[User Stories](https://github.com/nullgar/tweettah/wiki/User-Stories)



# Technologies used
### Backend:

- Python
- Flask
- SQLAlchemy
- PostgreSQL
- WTForms
- Docker
- Heroku

### Frontend:
- JavaScript
- React
- Redux
- CSS
- HTML



# To-dos/future features

- Using S3 for image upload with Flask
- User Profiles
- Follow Users
- Likes
