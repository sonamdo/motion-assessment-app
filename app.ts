import axios, { AxiosResponse } from 'axios';

//Access token is taken from command line as per spec requirements
//In development I would usually set this to an environment variable
const access_token: string = process.argv[2]
const fieldsArray = [
    'id',
    'name',
    'last_name'
]

//Function takes an array as input, allowing for customization if other fields are required
//Depending on use case, could also configure to take fields from the command line
async function fetchDataWithExponentialBackoff(fieldsArray: string[]) {
    const apiUrl = 'https://graph.facebook.com/v19.0/me?'
    const apiEndpointUrl = `${apiUrl}fields=${fieldsArray.join('%2C')}&access_token=${access_token}`
    const softMax = 10
    let retryAttempt = 0
    let delay = 2000

    while (true) {
        try {
            const response: AxiosResponse = await axios.get(apiEndpointUrl);
            console.log(response.data)
            return response.data;
        } catch(error) {
            console.error('Error fetching data:', error);
            retryAttempt++
            
            //implement soft cancel, begin exponential backoff after max retries
            //we don't want to hammer the api and reach our limit
            //The specs asked for the app to request data every 2 seconds.
            //However this would eventually hit the rate limit for a single user (200/hr)
            if (retryAttempt > softMax) {
                delay*=2
            }
            console.log(`Attempt number ${retryAttempt} failed, trying again in ${delay/1000} seconds`)
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    };
}

fetchDataWithExponentialBackoff(fieldsArray)
