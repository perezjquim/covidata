export default class API
{
  static async getGlobalNews()
  {
    const sUrl = `https://api.smartable.ai/coronavirus//news/global`;

    const oHeaders = { 
      "Subscription-Key": "6f718b8439f04c73af0ab73b67ea4a7d"
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