
/*The network Manager is going to be responsible for handling all our
  network requests to the server.
*/

import axios from 'axios';


const axiosEndpointManager = axios.create ({
  baseURL: 'https://api.instagram.com/v1/users/',
  timeout: 20000
});

class NetworkManager {

  constructor(accessToken){
    this.accessToken = accessToken;
  }

  getLoggedInUserInformation(completionCallback){

    /*self/?access_token=ACCESS-TOKEN*/

    axiosEndpointManager.get('self/?access_token=' + this.accessToken)
    .then(response => {
      completionCallback(response.data);
    })
    .catch(response => {
      console.log("Oops this one is an error");
      console.log(response);
    });

  }

}

export { NetworkManager };
