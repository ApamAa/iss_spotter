// iss.js
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/*
const fetchCoordsByIP = function (ip,callback){
        request('https://ipvigilante.com/'+ip, (error, response, body) => {
            if (error) {
                callback(error, null);
                return;
              }
      
            if (response.statusCode !== 200) {
            
            const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } 
        
        const Coordinates = {"latitude": JSON.parse(body).data.latitude,
                             "longitude" : JSON.parse(body).data.longitude};
        callback(null, Coordinates);
        
        });

      };
*/

const fetchCoordsByIP = function(ip, callback) {
    request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
  
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
        return;
      }
  
      const { latitude, longitude } = JSON.parse(body).data;
  
      callback(null, { latitude, longitude });
    });
  };



  const fetchISSFlyOverTimes = function (coordinate, callback){
    const LAT = coordinate.latitude;
    const LON = coordinate.longitude;
      
    request(`http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`, (error, response, body) => {
            if (error) {
                callback(error, null);
                return;
              }
      
            if (response.statusCode !== 200) {
            
            const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
            callback(Error(msg), null);
            return;
        } 
  
        const output = JSON.parse(body)
        callback(null, output.response);
        
        });
  }


  const nextISSTimesForMyLocation = function(finalPrint) {
    // empty for now
    fetchMyIP( (error1,ip) => {
            if (error1) {
                finalPrint(error1,null)
                return;
            }

            fetchCoordsByIP(ip,(error2,coordinates)=>{
                    if (error2) {
                        finalPrint(error2,null)
                        return;
                    }

                    fetchISSFlyOverTimes(coordinates, (error3,FlyOverTimes)=>{
                                    if (error3) {
                                        finalPrint(error2,null)
                                        return;
                                    }
                                    finalPrint(null,FlyOverTimes);
                    })
            })

    })

  }
  
  
module.exports = { fetchMyIP , fetchCoordsByIP ,fetchISSFlyOverTimes, nextISSTimesForMyLocation };


