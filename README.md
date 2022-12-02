# Corn Grub
## React project for CSCI 4300 Web Programming

---

### CREATORS

- John Lavender
- Jakson Hensley
- Jacob Kossler

---
### ABOUT

MERN (MongoDB, Express, React, NodeJS) full stack application built as final project for CSCI 4300 Web Programming. 

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






