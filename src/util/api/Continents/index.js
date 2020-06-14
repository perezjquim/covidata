import "babel-polyfill";

export default class API
{
  /*
  Totais por continente (todos). Sempre atualizado ao dia.
  Mortes, Recuperados, Ativos, Criticos, Casos por Milhão, População
  */
  static async getYesterdayContinent()
  {
    const sUrl = `https://corona.lmao.ninja/v2/continents?yesterday=true&sort=`;

    const oHeaders = { 
      "yesterday": "true"
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