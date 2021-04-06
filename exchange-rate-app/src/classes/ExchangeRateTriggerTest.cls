@isTest
public class ExchangeRateTriggerTest {
	@isTest
    static void testExchangeRateTrigger(){
        Exchange_Rate__c newRate = new Exchange_Rate__c();
        newRate.Name = 'TestRate';
        newRate.Base_Currency__c = 'GBP';
        newRate.CAD__c = 2.00;
        newRate.USD__c = 3.00;
        newRate.EUR__c = 0.50;
        newRate.GBP__c = 1.00;
        insert newRate;
        System.debug(newRate);
        
        Exchange_Rate__c updateRate = [SELECT Base_Currency__c, GBP__c, EUR__c FROM Exchange_Rate__c WHERE Id =: newRate.Id];
        updateRate.Base_Currency__c = 'EUR';
        update updateRate;
        System.debug(updateRate);
        System.assertEquals(updateRate.Base_Currency__c, 'EUR');
        System.assertEquals(updateRate.EUR__c, 0.50);
        
    }
}