trigger ExchangeRateTrigger on Exchange_Rate__c (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
 
    if(Trigger.isUpdate && Trigger.isBefore){
        List<String> listAPIfields = new List<String>();
        for(Exchange_Rate__c r : Trigger.New){
        	System.debug(r.Base_Currency__c);
            List<String> listRates = ExchangeCurrencyRateController.getRateFromObject();
            Double defRate = Double.valueOf(String.valueOf(r.get(r.Base_Currency__c + '__c')));
            
            
            for(String field : listRates){
                String fieldAPI = field + '__c';
                if(r.Base_Currency__c != field){
                    Double newRate = defRate / Double.valueOf(r.get(fieldAPI));
                    r.put(fieldAPI, newRate);
                    
                }
            }
            r.put(r.Base_Currency__c + '__c', 1);
           
        }
        
    }

  
}