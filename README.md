# MoackApp API documentation
created by Muhammad Ali Mazhuda
<br>

Base url : https://api-mockapp.herokuapp.com/

## <strong>1. Login</strong>
* url : https://api-mockapp.herokuapp.com/login
* method : <strong>POST</strong>
* header : none
* request params : none
* request body :
    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
    | 2|password    |String |required

* response : 
    ```
    {
        "error": false,
        "message": "Successfully logged in",
        "payload": {
            "token": "xxxxxxxxxxxxxxxxxxxxxxxxx"
        }
    }
    ```

## <strong>2. Register</strong>
* url : https://api-mockapp.herokuapp.com/register
* method : <strong>POST</strong>
* header : none
* request params : none
* request body : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|fullName    |String |required
    | 2|email       |String |required
    | 3|password    |String |required
* response : 
    ```
    {
        "error": false,
        "message": "Successfully registered an account, please check your email inbox or spam to activate your account",
        "payload": {
            "email": "test@gmail.com"
        }
    }
    ```

## <strong>3. Send Verification Code</strong>
* url : https://api-mockapp.herokuapp.com/sendVerificationCode
* method : <strong>POST</strong>
* header : none
* request params : none
* request body : 

    |No|Name        |Type   |Mandatory
    |--|------------|-------|---------
    | 1|email       |String |required
* response : 
    ```
    {
        "error": false,
        "message": "Verification code has been sent to your email"
    }
    ```

## <strong>4. Activate Account</strong>
* url : https://api-mockapp.herokuapp.com/activateAccount
* method : <strong>POST</strong>
* header : none
* request params : none
* request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
    | 2|verificationCode       |Number |required
* response : 
    ```
    {
        "error": false,
        "message": "Account successfully activated"
    }
    ```

## <strong>4. Forgot Password</strong>
* url : https://api-mockapp.herokuapp.com/forgotPassword
* method : <strong>POST</strong>
* header : none
* request params : none
* request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
* response : 
    ```
    {
        "error": false,
        "message": "Reset password has been sent to your email"
    }
    ```

## <strong>5. Form Reset Password</strong>
* url : https://api-mockapp.herokuapp.com/resetPassword/:id/:token
* method : <strong>GET</strong>
* header : none
* request params : none
* request body : none
* response : 
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

## <strong>6. Reset Password</strong>
* url : https://api-mockapp.herokuapp.com/resetPassword
* method : <strong>POST</strong>
* header : none
* request params : none
* request body : 

    |No|Name                   |Type   |Mandatory
    |--|-----------------------|-------|---------
    | 1|email                  |String |required
    | 2|newPassword            |String |required
* response : 
    ```
    {
        "error": false,
        "message": "Succesfully reset your password"
    }   
    ```