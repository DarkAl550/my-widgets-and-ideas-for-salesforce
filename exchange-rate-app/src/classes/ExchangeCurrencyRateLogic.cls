public class ExchangeCurrencyRateLogic {
    
    public static List<String> getRateFromObject(){
        
        List<String> listRates= new List<String>();
        Schema.DescribeFieldResult fieldResult = Exchange_Rate__c.Base_Currency__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry pickListVal : ple){
            listRates.add(pickListVal.getLabel());
        }

        return listRates;
    }
    
	public static void createNewRecord(){
        
        Exchange_Rate__c rate = new Exchange_Rate__c(); 
        Log__c log = new Log__c();        
        List<String> pickListRate = getRateFromObject();
        List<String> listRates = ExchangeCurrencyRateController.getRateFromObject();
        ExchangeCurrencyRateService.getRateREST(pickListRate[0], Date.today());
            
        RateResponse__c rr =  [SELECT Body__c, Status__c FROM RateResponse__c WHERE Name__c = 'Rate'];
            
        System.debug(rr.Body__c);
        System.debug(rr.Status__c);
            
        log.Response_Body__c = String.valueOf(rr.Body__c);
        log.Status_Code__c = String.valueOf(rr.Status__c);
            
            
        Map<String, Object> results = (Map<String, Object>)JSON.deserializeUntyped(rr.Body__c);     
        String r = String.valueOf(results.get('rates'));
        Map<String, Object> rates = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(results.get('rates')));
   		rate.Name = 'From Salesforce ';
        
		String[] dates = String.valueOf(results.get('date')).split('-');
        Date objDate = Date.parse(dates[1]+'/'+dates[2] + '/'+dates[0]);
        System.debug(objDate);
        System.debug(Date.today());
            
        rate.Date__c = Date.parse(dates[1]+'/'+dates[2] + '/'+dates[0]);
            
			
        insert log;
        rate.Log__c = log.Id;
            
        System.debug(log.Response_Body__c);
        System.debug(log.Status_Code__c);
        for(String field : listRates){
        	String fieldAPI = field + '__c';
            if(rates.get(field) != null){
            	rate.put(fieldAPI, Double.valueOf(String.valueOf(rates.get(field))));
            }else{
                //Skip SCD rate
                if(field == 'SCD'){}
                else{
                   rate.put(fieldAPI, 1); 
                }
                
            }
            
        }
        
        insert rate;
        System.debug(rate);
  
	}
    
    public static void updateRecords(Exchange_Rate__c rate){
        Log__c log = [SELECT Status_Code__c, Response_Body__c FROM Log__c WHERE Id = :rate.Log__c];        
        List<String> pickListRate = getRateFromObject();
        List<String> listRates = ExchangeCurrencyRateController.getRateFromObject();
        ExchangeCurrencyRateService.getRateREST(pickListRate[0], rate.Date__c);
        if(log.Status_Code__c != 'OK'){
            RateResponse__c rr =  [SELECT Body__c, Status__c FROM RateResponse__c WHERE Name__c = 'Rate'];
            System.debug(rr.Body__c);
            System.debug(rr.Status__c);
                
            log.Response_Body__c = String.valueOf(rr.Body__c);
            log.Status_Code__c = String.valueOf(rr.Status__c);
                
                
            Map<String, Object> results = (Map<String, Object>)JSON.deserializeUntyped(rr.Body__c);     
            String r = String.valueOf(results.get('rates'));
            Map<String, Object> rates = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(results.get('rates')));
            rate.Name = 'From Salesforce ';
            
            String[] dates = String.valueOf(results.get('date')).split('-');
            Date objDate = Date.parse(dates[1]+'/'+dates[2] + '/'+dates[0]);
            System.debug(objDate);
            System.debug(Date.today());
                
            rate.Date__c = Date.parse(dates[1]+'/'+dates[2] + '/'+dates[0]);
                
                
            update log;
            rate.Log__c = log.Id;
                
            System.debug(log.Response_Body__c);
            System.debug(log.Status_Code__c);
                
            for(String field : listRates){
                String fieldAPI = field + '__c';    
                if(rates.get(field) != null){
                    rate.put(fieldAPI, Double.valueOf(String.valueOf(rates.get(field))));
                }else{
                    //Skip SCD rate
                    if(field == 'SCD'){}
                    else{
                       rate.put(fieldAPI, 1); 
                    }
                }
            }
            
            update rate;
            System.debug(rate);
        }
        
    }
}