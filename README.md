# Corn Grub
## React project for CSCI 4300 Web Programming

---

### CREATORS

- John Lavender
- Jakson Hensley
- Jacob Kossler

---
### ABOUT

MERN (MongoDB, Express, React, NodeJS) full stack application built as final project for CSCI 4300 Web Programming. Why is the project "corn" themed? Don't know, I guess we just (a) really love corn and (b) have a middle school sense of humor, lol. ;)

---

### SETTING UP THE PROJECT 

Before running the project, there is a bit of setup that is required. In the server directory, you will need to add a *.env* file with the fields listed in the example below. 

<img src="/img/setup/env.png" width=400 alt="Failed to load image">

- Port: The port for the server side to run on
- DB: The url for the MongoDB database
- JWT_SECRET: Any (secure) random string
- EMAIL_ADDR: The email address to be used as the "business email"
- EMAIL_PASS: The password of the email address

Some email providers (such as gmail) require the use of an "app password". In the case of gmail, please refer to <a href="https://support.google.com/accounts/answer/185833?hl=en">Sign in with App Passwords</a>.

In the client directory, open the *package.json* file. At the bottom you will see the following line with a *proxy* option:

<img src="/img/setup/proxy.png" width=400 alt="Failed to load image">

This is the proxy url for axios to communicate with the server side. The default url here assumes that the server side is running on localhost on port 5000. The port here needs to match the port specified in the *.env* file in the server directory. 

Next, take a look at the *scripts* section in the same *package.json* file. You should see the following.

<img src="/img/setup/scripts.png" width=400 alt="Failed to load image">

If you wish to run the client side on a port besides 3000, you will need to change it here. For running, the "start" script is for MacOS and Linux systems. If on Windows, you will need to use "winStart" instead.

---

### RUNNING THE PROJECT

There are two options for running the project. You can either run the project normally or through Docker. 

#### NORMALLY

Starting from the root directory:

```
cd server
npm run seed
npm start
cd ../client
npm start
```

#### DOCKER

If the client side is set to run on a port other than 3000, you will need to change the line "EXPOSE 3000" in client/Dockerfile to match. Also, on the server side, if a port other than 5000 was set in the *.env* file, then the line "EXPOSE 5000" in server/Dockerfile will need to be changed.

From the root directory, run the following:

```
docker compose up
```

---

### WALKTHROUGH

After running the project, you may visit *http://localhost:3000/* (change url to match custom settings on client side if necessary). You should be greeted with the home page.

<img src="/img/walkthrough/1.png" width=400 alt="Failed to load image">

There is an "About" page which features a link to the Github repo.

<img src="/img/walkthrough/2.png" width=400 alt="Failed to load image">

The "kernel" of the project (please excuse the awful "play on words") is the menu section where users may add items to their cart and also view and write reviews. If you are not logged in, then the "Add to Cart" buttons will be unclickable and show the message "Must be logged in to add cart item". 

<img src="/img/walkthrough/3.png" width=400 alt="Failed to load image">

Let's get an account registered.

<img src="/img/walkthrough/5.png" width=400 alt="Failed to load image">

After entering valid credentials, you should see a success message.

<img src="/img/walkthrough/8.png" width=400 alt="Failed to load image">

We should receive an email that provides a link where we may validate our account

<img src="/img/walkthrough/9.png" width=400 alt="Failed to load image">

Going to the link, we should see a button to verify our account.

<img src="/img/walkthrough/10.png" width=400 alt="Failed to load image">

Clicking on the button should produce the following success message.

<img src="/img/walkthrough/11.png" width=400 alt="Failed to load image">

Now we can go login.

<img src="/img/walkthrough/6.png" width=400 alt="Failed to load image">

On login, we should be navigated to the account page.

<img src="/img/walkthrough/12.png" width=400 alt="Failed to load image">

When we navigate back to the menu page, we should now see the "Add to Cart" buttons.

<img src="/img/walkthrough/13.png" width=400 alt="Failed to load image">

When we click "Add to Cart", the button should immediately turn red and say "Already in Cart".

<img src="/img/walkthrough/14.png" width=400 alt="Failed to load image">

If we now navigate to the cart page, we should see the item(s) listed with counters for each.

<img src="/img/walkthrough/15.png" width=400 alt="Failed to load image">

At the bottom of the cart page are the total cost and a "Confirm Order" button.

<img src="/img/walkthrough/16.png" width=400 alt="Failed to load image">

When we click "Confirm Order", we should see the following success message...

<img src="/img/walkthrough/17.png" width=400 alt="Failed to load image">

and going back to the cart page shows that the cart has been purged of all items.

<img src="/img/walkthrough/18.png" width=400 alt="Failed to load image">

Now let's go to the review page for an item. There's currently no reviews written.

<img src="/img/walkthrough/19.png" width=400 alt="Failed to load image">

Let's write a review.

<img src="/img/walkthrough/20.png" width=400 alt="Failed to load image">

After the review has been posted, we should be navigated back to the review page with our new review visible.

<img src="/img/walkthrough/21.png" width=400 alt="Failed to load image">

---

## Thank you for enjoying our project!






