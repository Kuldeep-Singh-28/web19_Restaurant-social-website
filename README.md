<p>
  <img src="https://img.shields.io/badge/Nodejs-10.16.+-green.svg">
  <img src="https://img.shields.io/badge/Ex<press-4.17.+-purple.svg">
</p>
<img src="public/newLogo.png" />

# Restaurant-Social-App

#### This is a web dev project under IIT Indore summer of code

A project under IITISoC program to develop a full-stack social website for a restaurant with modern UI, realtime order updates and payment integration.
<br />

The app is divided into following sections -

1. Landing page
2. Menu page
3. Starters/Main course/Beverages/Dessserts page
4. User profile and order history page
5. Admin page containing the live orders.
6. Payment page.

Project Developers -

1. Sai Kiran Tirunagiri
2. Ujjawal Mittal
3. Tushar Goyal
4. Vangala Abhyuday
 <hr/>

The website is filled with dummy text wherever necessary.

<hr />

To see website in action, visit [https://hotelwebx.web.app/] (https://hotelwebx.web.app/)
<br />

## Description

### App Features

-   Uses Google Firebase authentication.
-   Realtime database using Firebase Firestore.
-   Payments using stripe.
-   Modern UI using react, material-bootstrap, gsap & fullpage animations.
-   The app is deployed using firebase hosting.

User-Features:

1. Login & register
2. Responsive design
3. Add to cart
4. Delete from cart
5. Checkout
6. Authentication and session using firebase auth.
7. Get a list of orders.
8. Ability to check order status.
9. Real-time order status using firebase firestore.
10. Access previous order history

Admin-Features:

1. Login
2. Orders lists.
3. Ability to Change order status
4. View any order
5. Ability to add or edit any product.
6. Ability to add or edit other admins.

## Snapshots

![homelightmode1](https://user-images.githubusercontent.com/65676476/105623717-cb340000-5e41-11eb-87a0-877734ee79b5.png)
![homedarkmode1](https://user-images.githubusercontent.com/65676476/105623707-bfe0d480-5e41-11eb-93a9-8a8b1e8c854d.png)
![menudarkmode1](https://user-images.githubusercontent.com/65676476/105623713-c4a58880-5e41-11eb-8f65-3271a652cb97.png)
![OrderSummarypage](https://user-images.githubusercontent.com/65676476/105623938-c1ab9780-5e43-11eb-8ed8-1ea30f56ac6b.png)
![image](https://user-images.githubusercontent.com/65676476/105624001-34b50e00-5e44-11eb-94d0-70dc0848906e.png)
![image](https://user-images.githubusercontent.com/65676476/105624019-51514600-5e44-11eb-804b-920c13c387bd.png)

<br /><br />

## Installation Requirements

-   Install Node.js >= 10
-   Install npm/yarn
-   Stripe account
-   Firebase account
-   Install lastest firebase-tools package as a global.

## Steps To Install

### STEP 1 ( CREATING A FIREBASE APP )

      1. Visit the firebase official website logged in with your google account then follow their simple guide to create a new firebase app.

      2. Remember your app secret key by visiting your app's setting page for further use.

<br />

### STEP 2 (CLONING AND SETTING ENVIRONMENT VARIABLES)

      1. Clone this project into your preffered directory

      2. Create a .env file and populate it with your stripe and firebase account secret keys using STRIPE_SEC_KEY and FIREBASE_SEC_KEY fields.

      > Please note that it is mandatory to provide both the above mentioned fields, failing which either the app will not be able to connect to firebase backend or the app will not be able to provide payments integration.

<br >

### STEP 3 ( Run Locally on Your Machine)

You need Node, NPM properly installed.

#### Install dependencies

```shell
    npm install
```

#### Fire up the payments server

```shell
    cd src/HotelX/ && node Stripe.js
```

#### Run the main application server

```shell
    npm start
```

<br >

## Known Bugs

There are no known bugs.

## Technologies

###### Back-end

NodeJS, Express, Firebase Firestore, Firebase auth.

###### Fron-end

React, GSAP, React-Bootstrap, Material-Bootstrap, Material UI.
