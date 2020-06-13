import "babel-polyfill";

export default class API
{
  static async getTodaysSummary()
  {
    const sUrl = `https://api.covid19api.com/summary`;

    const oHeaders = { 
     
    };

    const oResponse = await fetch(sUrl,
    {
      method: "GET",
      headers: oHeaders,
    });

    const oResult = await oResponse.json();

    // totais Mortes, Recuperadaos.. por País, e Global.
    const { Global, Countries } = oResponse;
    
    return oResult;
  }
}