export default class Country
{
  static async countries(country)
  {
    const sUrl = `https://api.covid19api.com/${country.trim()}`;

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