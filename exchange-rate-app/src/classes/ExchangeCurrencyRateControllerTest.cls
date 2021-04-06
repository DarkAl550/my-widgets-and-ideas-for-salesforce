@isTest
public class ExchangeCurrencyRateControllerTest {
	
    @isTest
    static void testGetRateByDate(){
        Date dt = Date.parse('6/19/2020');
        
        Exchange_Rate__c newTestRate = new Exchange_Rate__c();
		newTestRate.Name = 'Rate Currency 2020-06-19';
        newTestRate.Date__c = dt;
        newTestRate.Base_Currency__c = 'GBP';
        insert newTestRate;
        
        List<Exchange_Rate__c> testRate2 = ExchangeCurrencyRateController.getRateByDate('2020-6-18', '2020-6-19', '');
        
        List<Exchange_Rate__c> testRate = ExchangeCurrencyRateController.getRateByDate('2020-6-18', '2020-6-19', 'GBP');
        System.debug(testRate.size());
        System.assertEquals(1,testRate.size());
        
    }
    @isTest
    static void testEditBaseCurrency(){
        
        Exchange_Rate__c newRate = new Exchange_Rate__c();
        newRate.Name = 'TestRate';
        newRate.Base_Currency__c = 'GBP';
        newRate.CAD__c = 2.00;
        newRate.USD__c = 3.00;
        newRate.EUR__c = 0.50;
        newRate.GBP__c = 1.00;
        insert newRate;
        
        ExchangeCurrencyRateController.editBaseCurrency(newRate.Id, 'USD');
        Exchange_Rate__c rate = [SELECT Base_Currency__c FROM Exchange_Rate__c WHERE Id = :newRate.Id];
        
        System.assertEquals('USD', rate.Base_Currency__c);
    }
    
}