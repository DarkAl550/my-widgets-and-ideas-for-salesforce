@isTest
public class ExchangeCurrencyRateLogicTest {
	@isTest 
    static void testGetRateFromObject(){
        List<String> testList = ExchangeCurrencyRateLogic.getRateFromObject();
        System.assert(testList.size()>0);
    }
    
    @isTest
    static void testCreateNewRecod(){
        Test.setMock(HttpCalloutMock.class, new ExchangeCurrencyRateServiceMock()); 
        RateResponse__c rr =  new RateResponse__c();
        rr.Name__c = 'Rate';
        rr.Status__c = 'OK';
        rr.Body__c = '{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        insert rr;
        System.debug(rr);
        Test.startTest();
        ExchangeCurrencyRateLogic.createNewRecord();
        Test.stopTest();
        
        List<Exchange_Rate__c> rates = [SELECT Id FROM Exchange_Rate__c];
        System.debug('Rates: '+rates.size());
        System.assert(rates.size()>0);
        List<Log__c> logs = [SELECT Id FROM Log__c];
        System.debug('Logs: '+logs.size());
        System.assert(logs.size()>0);
      
    }
    @isTest
    static void testUpdateRecords(){
        Log__c log = new Log__c();
        log.Status_Code__c = null;
        log.Response_Body__c = null;
        insert log;
        
        Exchange_Rate__c newTestRate = new Exchange_Rate__c();
        newTestRate.Name = 'Test Rate';
        newTestRate.Date__c = Date.parse('6/19/2020');
        newTestRate.Log__c = log.Id;
        insert newTestRate;
        
        Test.setMock(HttpCalloutMock.class, new ExchangeCurrencyRateServiceMock()); 
        RateResponse__c rr =  new RateResponse__c();
        rr.Name__c = 'Rate';
        rr.Status__c = 'OK';
        rr.Body__c = '{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        insert rr;
        System.debug(rr);
        Test.startTest();
        ExchangeCurrencyRateLogic.updateRecords(newTestRate);
        Test.stopTest();
        
        List<Exchange_Rate__c> rates = [SELECT Id, Name FROM Exchange_Rate__c];
        System.debug('Rates: '+rates);
        System.assert(rates.size()>0);
        List<Log__c> logs = [SELECT Id FROM Log__c];
        System.debug('Logs: '+logs.size());
        System.assert(logs.size()>0);
        
        
        
        
    }
}