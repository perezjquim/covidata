import "babel-polyfill";

export default class API
{
  static async getGlobalInfo()
  {
    const sUrl = `https://corona.lmao.ninja/v2/all?yesterday=`;

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