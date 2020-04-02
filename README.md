# MockApp API documentation
Created by Muhammad Ali Mazhuda
<hr>

You can import Postman collection from file
#### MockApp.postman_collection.json

### Base url : https://api-mockapp.herokuapp.com/

## <strong>1. Login</strong>
* #### url : https://api-mockapp.herokuapp.com/login
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required

* #### Success response :
    ##### Account is activated
    ```
    {
        "error": false,
        "message": "Successfully logged in",
        "payload": {
            "token": "xxxxxxxxxxxxxxxxxxxxxxxxx"
        }
    }
    ```
    ##### Account is not activated
    ```
    {
        "error": false,
        "message": "Please activate your account",
        "payload": {
            "email": "test@mail.com"
        }
    }
    ```
* #### Error response : 
    ##### Error Code : 400(Bad Request)
    ```
    {
        "error": true,
        "message": "Email or password must be provided"
    }
    ```
    ##### Error Code : 404(Not Found)
    ```
    {
        "error": true,
        "message": "Invalid email or password"
    }
    ```

## <strong>2. Register</strong>
* #### url : https://api-mockapp.herokuapp.com/register
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|fullName    |String |required
    | 2|email       |String |required
    | 3|password    |String |required
* #### Success response : 
    ```
    {
        "error": false,
        "message": "Successfully registered an account, please check your email inbox or spam to activate your account",
        "payload": {
            "email": "test@gmail.com"
        }
    }
    ```
* #### Error response : 
    ##### Error Code : 409(Conflict)
    ```
    {
        "error": true,
        "message": "Email is already registered"
    }
    ```
    ##### Error Code : 400(Bad Request)
    ```
    {
        "error": true,
        "message": "Fullname, email and password must be provided"
    }
    ```

## <strong>3. Send Verification Code</strong>
* #### url : https://api-mockapp.herokuapp.com/sendVerificationCode
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
* #### Success response : 
    ```
    {
        "error": false,
        "message": "Verification code has been sent to your email"
    }
    ```

* #### Error response : 
    ##### Error Code : 400(Bad Request)
    ```
    {
        "error": true,
        "message": "Email must be provided"
    }
    ```
    ##### Error Code : 404(Not Found)
    ```
    {
        "error": true,
        "message": "Invalid email"
    }
    ```

## <strong>4. Activate Account</strong>
* #### url : https://api-mockapp.herokuapp.com/activateAccount
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
    | 2|verificationCode       |Number |required
* #### Success response : 
    ##### Account is not activated 
    ```
    {
        "error": false,
        "message": "Account successfully activated"
    }
    ```
    ##### Account is activated
    ```
    {
        "error": false,
        "message": "Account is already activated"
    }
    ```
* #### Error response :
    ##### Error Code : 400(Bad Request) 
    ```
    {
        "error": true,
        "message": "Email and verification code must be provided"
    }
    ```
    ##### Error Code : 404(Not Found) 
    ```
    {
        "error": true,
        "message": "User not found"
    }
    ```
    ##### Error Code : 404(Not Found) 
    ```
    {
        "error": true,
        "message": "Invalid verification code"
    }
    ```
    

## <strong>4. Forgot Password</strong>
* #### url : https://api-mockapp.herokuapp.com/forgotPassword
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
* #### Success response : 
    ```
    {
        "error": false,
        "message": "Reset password has been sent to your email"
    }
    ```

## <strong>5. Form Reset Password</strong>
* #### url : https://api-mockapp.herokuapp.com/resetPassword/:id/:token
* #### method : <strong>GET</strong>
* #### header : none
* #### request params : none
* #### request body : none
* #### Success response : 
    ```
    {
        "error": false,
        "message": "Token is valid",
        "payload": {
            "id": 1,
            "email": "test@mail.com"
        }
    }
    ```
* #### Error response :
    ##### Error Code : 400(Bad Request) 
    ```
    {
        "error": true,
        "message": "invalid signature"
    }
    ```

## <strong>6. Reset Password</strong>
* #### url : https://api-mockapp.herokuapp.com/resetPassword
* #### method : <strong>POST</strong>
* #### header : none
* #### request params : none
* #### request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
    | 2|newPassword            |String |required
* #### Success response : 
    ```
    {
        "error": false,
        "message": "Succesfully reset your password"
    }   
    ```

* #### Error response :
    ##### Error Code : 400(Bad Request) 
    ```
    {
        "error": true,
        "message": "Email and newPassword must be provided"
    }
    ```
    ##### Error Code : 404(Not Found) 
    ```
    {
        "error": true,
        "message": "User not found"
    }
    ``` 