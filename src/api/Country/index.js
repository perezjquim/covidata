export default class Country
{
  static async getCountries()
  {
    const sUrl = `https://api.covid19api.com/countries`;

    const oHeaders = { 
      Country: "Nome",
      Slug: "Slug",
      ISO2: "Abrev"
    };

    const oResponse = await fetch(sUrl,
    {
            headers: oHeaders,
    });

    const oResult = await oResponse.json();
    
    return oResult;
  }
}