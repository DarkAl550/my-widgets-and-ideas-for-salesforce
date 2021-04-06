public class ExchangeCurrencyRateController {
	@AuraEnabled
    public static List<String> getRateFromObject(){
        
        List<String> listRates= new List<String>();
        Schema.DescribeFieldResult fieldResult = Exchange_Rate__c.Base_Currency__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry pickListVal : ple){
            listRates.add(pickListVal.getLabel());
        }
		System.debug(listRates);
        return listRates;
    }
    
    @AuraEnabled
    public static List<Exchange_Rate__c> getRateByDate(String d1, String d2, String selectRate){
        String rateVal;
        if(selectRate == null || selectRate == ''){
            rateVal='';
        }else{
            rateVal= ' AND Base_Currency__c = \'' + selectRate+'\'';
        }
        List<String> rateFields = getRateFromObject();
        String fields = 'Name';
        for(String field : rateFields){
            fields += ', '+field + '__c';
        }
        String[] dat1 = d1.split('-');
        String[] dat2 = d2.split('-');
 
		Date dt1 = Date.parse(dat1[1]+'/'+dat1[2]+'/'+dat1[0]);
        Date dt2 = Date.parse(dat2[1]+'/'+dat2[2]+'/'+dat2[0]);
        
        
        List<Exchange_Rate__c> rate = Database.query('SELECT Id, '+fields +', Date__c, Log__r.Status_Code__c, Base_Currency__c FROM Exchange_Rate__c WHERE Date__c >= :dt1 AND Date__c <= :dt2' + rateVal + ' ORDER BY Date__c DESC');
    	System.debug(rate);
        
        return rate;
    }
    
    @AuraEnabled
    public static void editBaseCurrency(Id rateId, String defCurrency){
        Exchange_Rate__c rate = [SELECT Base_Currency__c FROM Exchange_Rate__c WHERE Id = :rateId];
        rate.Base_Currency__c = defCurrency;
        update rate;
    }
  
    
}