import "babel-polyfill";

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

    // Nome do pais, codigo, e numero de casos (com data); Confirmados, mortes, recuperados e ativos
    // para cada pais a 1ª data corresponde a primeira confirmação de um caso. 
    const { Country, CountryCode, Date, Confirmed, Deaths, Recovered, Active } = oResponse; 
    
    return oResult;
  }
}