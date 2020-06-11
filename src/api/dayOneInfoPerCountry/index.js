export default class API
{
  static async getDayOneInfoCountry(country)
  {
    const sUrl = `https://api.covid19api.com/dayone/country/${country}`;

    const oHeaders = { 
     
    };

    const oResponse = await fetch(sUrl,
    {
      method: "GET",
      headers: oHeaders,
    });

    const oResult = await oResponse.json();

    const { Country, CountryCode, Date, Confirmed, Deaths, Recovered, Active } = oResponse; 
    
    return oResult;
  }
}