# Uber Clone Backend

## API Endpoints

### User Registration

#### POST /users/register

This endpoint is used to register a new user.

##### Request

- **URL:** `/users/register`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  - `email` (string, required): The email address of the user. Must be a valid email format.
  - `fullname` (object, required):
    - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
    - `lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
  - `password` (string, required): The password for the user. Must be at least 6 characters long.

##### Example Request Body

```json
{
  "email": "yuvraj@gmail.com",
  "fullname": {
    "firstname": "Yuvraj",
    "lastname": "Singh"
  },
  "password": "yourpassword"
}
```

##### Responses

- **201 Created**

  - **Description:** User successfully registered.
  - **Body:**
    - `token` (string): The authentication token for the user.
    - `user` (object): The registered user object.

- **400 Bad Request**
  - **Description:** Validation error or missing required fields.
  - **Body:**
    - `errors` (array): An array of validation error messages.

### User Login

#### POST /users/login

This endpoint is used to log in an existing user.

##### Request

- **URL:** `/users/login`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  - `email` (string, required): The email address of the user. Must be a valid email format.
  - `password` (string, required): The password for the user. Must be at least 6 characters long.

##### Example Request Body

```json
{
  "email": "yuvraj@gmail.com",
  "password": "yourpassword"
}
```

##### Responses

- **200 OK**

  - **Description:** User successfully logged in.
  - **Body:**
    - `token` (string): The authentication token for the user.
    - `user` (object): The logged-in user object.

- **400 Bad Request**

  - **Description:** Validation error or missing required fields.
  - **Body:**
    - `errors` (array): An array of validation error messages.

- **401 Unauthorized**
  - **Description:** Invalid email or password.
  - **Body:**
    - `message` (string): Error message indicating invalid email or password.
