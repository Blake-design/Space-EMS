# Space-EMS

Can you get the emergency supplies safely across the universe? See if you can clear a path through the astroid field by playing this game made with p5.js, MySQL, and Express.js.

## Table of Contents

1. [Description](#description)
2. [Deployment](#deployment)
3. [Technologies and Packages](#technologies-and-packages)
4. [Installation](#installation)
5. [Collaboration](#collaboration)
6. [Copyrights](#copyrights)
7. [Contact](#contact)



## Description

Space-EMS is a web-based space-themed multi-directional shooter-style game. The object of the game is to shoot and destroy the asteroids in the way of the space-EMS ship, while not colliding with either, so that the ship can safely deliver the emergency supplies to the destination planet. 

A user must register/log in to play, and upon login the user is presented with a dashboard to enter gameplay and a leaderboard with top scores. 

### Minimum Viable Product (MVP)

* User lands on homepage, clicks "Click Here to Play!"
* User must create an account/login to view dashboard and begin game play
* Upon login, user is directed to personalized dashboard
* Gameplay can begin with arrow/spacebar keys
* Score is incremented for every asteroid that is hit and destroyed
* Highest score is saved
* Score and level is reset when asteroid hits ship
* MySQL database stores user data and score data
* User information and passwords are protected by bcrypt and authentication
* User's highest score persists upon each log in
* Top 3 highest user scores displayed in leaderboard table

### Future Development

* Add more gameplay features such as enhanced graphics, more obstacles, additional level enhancements
* Mobile-friendly gameplay
* Option to search for other registered users by username (such as friends you want to challenge) and pin their scores
* Make site into a multi-game dashboard - allowing users to select from a variety of games to play from

## Deployment

This project is deployed on [Heroku](https://space-ems.herokuapp.com/) 

[homepage]![Screen Shot 2021-11-09 at 7 10 04 PM](https://user-images.githubusercontent.com/84485576/141031254-eeb39ece-8319-4e26-a51e-5d4493f9dd23.png)
[login]![Screen Shot 2021-11-09 at 7 10 25 PM](https://user-images.githubusercontent.com/84485576/141031278-ad288d8e-7e9e-42e0-b585-1b5a18c6af03.png)
[dashboard]![Screen Shot 2021-11-09 at 7 10 50 PM](https://user-images.githubusercontent.com/84485576/141031316-55e7803f-7257-4714-bf00-2389d9185f2e.png)

## Technologies and Packages

* Node.js
* Express.js
* Express-Session
* Handlebars
* Express-Handlebars
* RESTful API
* MySQL
* Sequelize
* .ENV
* bcrypt
* Bootstrap CSS
* p5.js (NEW)

## Installation

* $ git clone https://github.com/Blake-design/Space-EMS
* $ cd ../path/to/the/file
* $ npm install
* $ node server.js

## Collaboration

This project was designed and developed by Blake McCarty, Deni Mazzei, and Jose Izquierdo as part of the UTSA Coding Bootcamp.

## Copyrights

* Gameplay starter code: (https://github.com/CodingTrain/Asteroids)

*Special thanks to TA Alvin Ng and Will Utterback for their guidance!

## Contact

For questions, support, or recommendations regarding this repo or gameplay, please contact !(dconkell@gmail.com) and include "Space-EMS" in the subject line. 
