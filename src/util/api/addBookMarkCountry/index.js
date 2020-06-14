import "babel-polyfill";

export default class API
{
  // receives the array of bookmarks
  static async getBookMarkedCountries(...bookmarks)
  {
    // joins the array to ask for the info for the countries selected
    const sUrl = `https://corona.lmao.ninja/v2/countries/${bookmarks.join(',')}`;

    const oHeaders = { 
    };

    const oResponse = await fetch(sUrl,
    {
      method: "GET",
      headers: oHeaders,
    });

    const oResult = await oResponse.json();

    return oResult;
  }
}