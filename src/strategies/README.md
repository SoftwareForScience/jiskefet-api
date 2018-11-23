# Jiskefet API

## JWT
Jiskefet API currently uses a JWT implementation in order to authorize users and subsystems to the secured endpoints.  
**The flow for a user:**  
1. User signs in with (GitHub/ CERN) SSO.
2. Back end returns a JWT token on successful sign in.
    * Token has an expiration field called `exp` displayed in epoch. Once the epoch time is reached, the token is automatically invalidated. This requires the user to re-authenticate in order to access the application.
3. User can now access the protected endpoints.  
4. User makes a request to a protected endpoint.
5. JWTStrategy checks the request headers for an `Authorization: Bearer ${token}` header and validates it.
  
**The flow for a subsystem:**  
Prerequisite: The user needs to create a JWT for the subsystem, so that the subsystem can make requests to the secured endpoint.
1. Subsystem makes a request to a protected endpoint with the supplied JWT from the user.
    * note that the JWT for a subsystem has an long exp date.
2. JWTStrategy checks the request headers for an `Authorization: Bearer ${token}` and validates it.