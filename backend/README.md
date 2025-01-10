# API Documentation

## 1. User Registration

### Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It requires the user's full name, email, and password.

### Method
`POST`

### Request Body
The request body should be a JSON object containing the following fields:
- `fullName`: An object containing `firstName` and `lastName`.
  - `firstName`: A string representing the user's first name. Must be at least 3 characters long.
  - `lastName`: A string representing the user's last name.
- `email`: A string representing the user's email. Must be a valid email address.
- `password`: A string representing the user's password. Must be at least 6 characters long.

#### HTTP Example
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: `201 Created`
- **Response Body**: A JSON object containing the user's token and user details.
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Errors
- **Status Code**: `400 Bad Request`
  - **Response Body**: A JSON object containing an array of validation errors.
    ```json
    {
      "errors": [
        {
          "msg": "invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "firstName must be at least 3 characters long",
          "param": "fullName.firstName",
          "location": "body"
        },
        {
          "msg": "password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```
  - **Response Body**: If the you can try to create a new user with the same email than it will throw an error which contains, A json object indicating that the user already exists.
    ```json
        {
          "msg": "user already exists",  
        }
    ```

## 2. User Login

### Endpoint: `/users/login`

### Description
This endpoint authenticates a user and returns a JWT token for authorized access.

### HTTP Method
`POST`

### Request Body
The request body should be a JSON object containing:
- `email`: A string representing the user's email
- `password`: A string representing the user's password

#### HTTP Example
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code**: `200 OK`
- **Response Body**: A JSON object containing the user's token and user details
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Errors
- **Status Code**: `401 Unauthorized`
  - When email/password is invalid:
    ```json
    {
      "message": "invalid email or password"
    }
    ```
- **Status Code**: `400 Bad Request`
  - When validation fails:
    ```json
    {
      "errors": [
        {
          "msg": "invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```