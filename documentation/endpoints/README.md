# SERVER

## /servers

* Receives GET requests from front end
* Handles GET request by querying database for server(s) that user has access to
* Sends to front end necessary information about server(s) found to display on page
  
## /servers/:server_id

* Receives GET requests from front end
* Handles GET request by querying database for server with specified ID
* Sends to front end information about server to display on page
  
## /add-server

* Receives POST requests from front end
* Handles POST request by validating and adding server information to database
* If server is added, sends to front end necessary information to display server on page 

## /servers/edit/:server_id

* Receives PATCH requests from front end
* Handles PATCH request by querying database for server with specified ID, validates information, and applies change
* Sends to front end information about updated server to display on page

## /servers/delete/:server_id

* Receives DELETE requests from front end
* Handles DELETE request by querying database for server with specified ID and deletes it
* NOT SURE WHAT TO SEND BACK (new list of existing servers?)

## /channels

* Receives GET requests from front end
* Handles GET request by querying database for channel(s)
* Sends to front end necessary information about channels(s) found to display on page

## /channels/:channel_id

* Receives GET requests from front end
* Handles GET request by querying database for channel with specified ID
* Sends to front end information about channel to display on page

## /add-channel

* Receives POST requests from front end
* Handles POST request by validating and adding channel information to database
* If channel is added, sends back information to display channel on page

## /channels/edit/:channel_id

* Receives PATCH requests from front end
* Handles PATCH request by querying database for channel with specified ID, validates information, and applies change
* Sends to front end information about updated channel to display on page

## /channels/delete/:channel_id

* Receives DELETE requests from front end
* Handles DELETE request by querying database for channel with specified ID and deletes it
* Sends to front end confirmation of delete

## /sign-up

* Receives POST requests from front end
* Handles POST request by validating information and adding it to the database
* Also generates JWT token for user

## /log-in

* Receives POST requests from front end
* Handles POST request by validating information and generating JWT token

## /users/:user_id

* Receives GET requests from front end
* Handles GET request by querying database for information about user with specified ID
* Sends to front end information about user

## /users/edit/:user_id

* Receives PATCH requests from front end
* Handles PATCH request by querying database for user with specified ID, validates information, and applies change
* Sends to front end information about updated user to display on page

## /users/delete/:user_id

* Receives DELETE requests from front end
* Handles DELETE request by querying database for user with specified ID and deleting user from database
* Sends to front end confirmation of delete

# CLIENT

## /login

* Displays log-in form

## /signup

* Displays sign-up form

## /

* Displays home page