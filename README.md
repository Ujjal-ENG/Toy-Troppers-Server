# Project Title: Toy | Troppers Server

Toy | Troppers is an e-commerce-based website specializing in the sale of action figure toys. Our platform offers a wide range of iconic characters from popular franchises such as Marvel, Star Wars, Transformers, and more. We are dedicated to providing collectors and enthusiasts with high-quality and authentic action figures that bring their favorite characters to life. With an extensive selection of products, Toy | Troppers caters to the diverse interests of toy enthusiasts, ensuring that everyone can find their favorite action figures. Whether you're a Marvel fan, a Star Wars aficionado, or a Transformers enthusiast, our website is your go-to destination for sourcing the finest action figures. Join us and embark on an exciting journey into the world of action figure collectibles with Toy | Troppers.

## Features of this Project
- For server making i used NodeJs on the top of Express Js for make the server easily. We Know,  Node.js is a JavaScript runtime that allows developers to write server-side code using the same language as they use for client-side code. Express.js is a minimal and flexible Node.js web application framework that provides a set of features for building web and mobile applications. Using Express.js with Node.js allows for efficient development, as well as the ability to easily scale and maintain applications.

- Also, some packages were used to quickly set up this server, such as CORS, Nodemon, and Concurrently, which allows for running both the server and client simultaneously.

- Also used express json middleware.

## Routes
- In this project, I created nine routes, one being the default route and the others being specific path routes.
- Another one route which mainly the health of the server and the endpoint is **/health**.

# Endpoints

The following are the available endpoints for this server:

- **GET / - Default route that returns a message.**
- **GET /health - Default route that returns a health message.**
- **POST /jwt - created the secret token of the each user for better security of the backend.**
- **GET /all-toys - Returns the data for all toys.**
- **GET /toys-lengths - Returns the number of all toys.**
- **GET /my-toys - Returns the data for all toys for specific login user.**
- **GET /single-toys-details/:id - Returns data for a specific toy details.**
- **GET /blogs - Returns the data for all blogs.**
- **POST /add-toys - created the new toy.**
- **PATCH /update-toys-details - update the specific toy.**
- **DELETE /delete-toys-details - delete the specific toy.**

**Several Types of Packages Used in this Project**

## Live Server Site Link

You can visit the Live Server Site at [https://toy-troppers-server.vercel.app/]

## Author

My name is Ujjal Kumar Roy and I recently graduated with a degree in Computer Science and Engineering. I am passionate about web development and love to build things that people can use. In my free time, I enjoy playing cricket and listening to music.

- Facebook: [Ujjal Kumar Roy](https://www.facebook.com/ujjal.roy.7862/)
- LinkedIn: [Ujjal Kumar Roy](https://www.linkedin.com/in/ujjal-kumar-roy/)

If you have any feedback or suggestions for this project, feel free to contact me at ujjalroy7862@gmail.com