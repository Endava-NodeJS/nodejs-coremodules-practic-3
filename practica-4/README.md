### JWT Authentication, Passport.

In this lesson we’ll learn how to implement authorization functionality creating NodeJS API. It will be based on our previously created API (notes CRUD).

What could be helpful? As we’re working with databases (SQLite) it’s better to have a database management tool, like [DBeaver](https://dbeaver.io/download/). Also, there should be installed tools such as Postman or curl (cli tool) to have a more comfortable way to test our API endpoints. Once those are installed, we’re ready to go.

--- 

#### Here’s what we have to implement during that session:
 - Create the database table named "user" to store the login and password there
   
 - Create POST /signup endpoint and store login (email) and hashed password
   
 - Create POST /signin endpoint that will return access token on success or 404 with message “User not found” on fail

 - Create express middleware to validate the token provided in Authorization header and to add user’s data to the “request” object if access token is correct

To test the implementation you have to make POST, DELETE and PUT /notes endpoints to be authorized

Other endpoints should remain public

---

#### Here’s a list of npm packages that could be helpful during the implementation:
 1) [Bcrypt](https://www.npmjs.com/package/bcrypt) - it will help you to create and compare password hash
 2) [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - for JWT generation and validation
 3) [Sequelize](https://www.npmjs.com/package/sequelize) - promise-based ORM tool (you can use it with SQLite as well)
---

### Main flow structure:
##### Sign-up
- Sign-up (email, password) (FE => BE)
- Store user in DB if it doesn’t exist (BE)
- Success response (BE => FE)

#### Sign-in
- Sign-in request (browser) (FE => BE)
- Create JWT with secret (BE => FE)
- Store the JWT (FE)

#### Each authorized request
- Authenticated request (browser) (FE => BE)
- Validate JWT, attach user to req object (BE)
- Response (BE => FE)

---

#### Useful links:
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [JWT](https://jwt.io/introduction)
- [Express middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express middleware usage](https://expressjs.com/en/guide/writing-middleware.html)
- [Express routing](https://expressjs.com/en/guide/routing.html)
- [Sequelize Models basics](https://sequelize.org/master/manual/model-basics.html)
- [Password hash with salt](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/)

