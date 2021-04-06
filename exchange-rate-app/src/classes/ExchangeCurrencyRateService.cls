public class ExchangeCurrencyRateService  {

    @future(callout=true)
    public static void getRateREST(String defRate, Date todayDate){
       System.debug(defRate);
        API_Key__mdt KEY = null;
        /** If in your request useble user API key **/
        /* Get API key for request */
        KEY = [SELECT KEY__c, ServiceAPI__c FROM API_Key__mdt KEY WHERE Label = 'Rate'];
        
		List<String> listRates = ExchangeCurrencyRateController.getRateFromObject();
        
		/* fix error when default rate — EUR */
        String rates = listRates[0];
        for(Integer i=1;i<listRates.size();i++){
            if(listRates[i] == 'EUR' && defRate == 'EUR'){}
            else{
                //Skip SCD rate
                if(listRates[i] == 'SCD'){}
                else{
                    rates += ','+listRates[i];
                }
            }
            
        }
        
        String dates = String.valueOf(todayDate);
        HttpRequest request = new HttpRequest();
        request.setEndpoint(KEY.ServiceAPI__c + dates +'?base=' + defRate + '&symbols=' + rates);
        request.setMethod('GET');
        request.setTimeout(60000);
        HttpResponse response = new Http().send(request);
        System.debug(response.getBody());
        System.debug(response.getStatus());
        // use Custom Settings to save response 
    	RateResponse__c rr =  [SELECT Body__c, Status__c FROM RateResponse__c];

        rr.Body__c = String.valueOf(response.getBody());
       	rr.Status__c = response.getStatus();
        update rr;
        
        System.debug(rr);

                 	   
       
	}
    
    
	
	
}