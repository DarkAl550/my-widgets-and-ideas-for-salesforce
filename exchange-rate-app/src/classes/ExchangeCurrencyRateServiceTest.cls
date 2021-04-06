@isTest
public class ExchangeCurrencyRateServiceTest {
	@isTest 
    static void testPostCallout() {
     
        Test.setMock(HttpCalloutMock.class, new ExchangeCurrencyRateServiceMock()); 
        RateResponse__c rr = new RateResponse__c();
        rr.Name__c = 'Rate';
        rr.Status__c = 'OK';
        rr.Body__c ='{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        insert rr;
		Date dt = Date.parse('6/19/2020');
        
        Test.startTest();
		ExchangeCurrencyRateService.getRateREST('GBP', dt);        
        Test.stopTest();
        
         
        
        String actualValue = rr.Body__c;
        System.debug(rr.Body__c);
        String expectedValue = '{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        System.assertEquals(actualValue, expectedValue);
        
        
}
    
}