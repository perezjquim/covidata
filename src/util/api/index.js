export default class APIHelper
{
        static async dummy()
        {
                const sUrl = "https://services.odata.org/V3/OData/OData.svc/Products";
                const oHeaders = { test_header: "header cenas" };
                const oResponse = await fetch(sUrl,
                {
                        headers: oHeaders,
                });
                const oResult = await oResponse.json();
                return oResult;
        }
}
