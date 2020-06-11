export default class Country
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
    
    return oResult;
  }
}