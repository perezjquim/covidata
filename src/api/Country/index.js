export default class API
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

    //get name and abrv for each country
    const {Country, ISO2} = oResponse;
    
    return oResult;
  }
}