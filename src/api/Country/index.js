export default class Country
{
  static async getCountries()
  {
    const sUrl = `https://api.covid19api.com/countries`;

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