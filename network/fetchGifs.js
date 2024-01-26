import {API_URL, SEARCH_API_URL, TRENDING_API_URL} from '../constants';

const generateUrl = (url, params) => {
  let finalUrl = url;
  Object.keys(params).forEach((item, index) => {
    let val = params[item];
    let paramToBeAppended = '';
    if (!!val) {
      if (index === 0) {
        paramToBeAppended = `?${item}=${val}`;
      } else {
        paramToBeAppended = `&${item}=${val}`;
      }
    }
    finalUrl += paramToBeAppended;
  });
  return finalUrl;
};

export async function fetchGif(params) {
  try {
    let finalUrl;
    if (!!params.q) {
      finalUrl = generateUrl(SEARCH_API_URL, params);
    } else {
      finalUrl = generateUrl(TRENDING_API_URL, params);
    }

    console.log('SUCK!!! ~ finalUrl:', finalUrl, params);

    const res = await fetch(finalUrl);
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
    console.log(err);
  }
}
