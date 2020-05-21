import axios from 'axios';

export const getRoute = (startCoordinates, endCoordinates, avoidAreas) => {
  const apiKey = 'hBND9Ooa_kcOV6Jfh3vEa0x-F-w46uTQUjxsje5Q8zo';

  if (avoidAreas) {
    return axios.get(
      `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apikey=${apiKey}&waypoint0=geo!${startCoordinates}&waypoint1=geo!${endCoordinates}&mode=fastest;pedestrian;traffic:disabled`,
    );
    // return axios.get(
    //   'https://route.ls.hereapi.com/routing/7.2/calculateroute.json',
    //   {
    //     params: {
    //       apikey: apiKey,
    //       waypoint0: `geo!${startCoordinates}`,
    //       waypoint1: `geo!${endCoordinates}`,
    //       mode: 'fastest;pedestrian;traffic:disabled',
    //       avoidareas: avoidAreas,
    //     },
    //   },
    // );
  } else {
    return axios.get(
      `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apikey=${apiKey}&waypoint0=geo!${startCoordinates}&waypoint1=geo!${endCoordinates}&mode=fastest;pedestrian;traffic:disabled`,
    );
    // return axios.get(
    //   'https://route.ls.hereapi.com/routing/7.2/calculateroute.json',
    //   {
    //     params: {
    //       apikey: apiKey,
    //       waypoint0: `geo!${startCoordinates}`,
    //       waypoint1: `geo!${endCoordinates}`,
    //       mode: 'fastest;pedestrian;traffic:disabled',
    //     },
    //   },
    // );
  }
};

export const getPollutionData = () => {
  return axios.get(
    'https://spheric-mesh-269023.nw.r.appspot.com/api/pollution-points/',
  );
};

export const getUser = async (username, password) => {
  console.log('before get request');
  const {data} = await axios.get(
    'https://spheric-mesh-269023.nw.r.appspot.com/api/users',
  );

  const user = data.users.filter(
    userObj => userObj.username === username && userObj.password === password,
  );

  return user;
};
