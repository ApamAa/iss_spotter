const { fetchMyIP, fetchCoordsByIP , fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
*/
/*fetchCoordsByIP("198.47.47.207",(error,data) => {
    console.log(error);
    console.log(data);
})
*/
/*
fetchCoordsByIP('162.245.144.188', (error, coords) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned Coords:' , coords);
  });
*/
/*

const coords = { latitude: '49.27670', longitude: '-123.13000' }

  fetchISSFlyOverTimes(coords, (error, output) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked!:' , output);
  });

 */ 
const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});