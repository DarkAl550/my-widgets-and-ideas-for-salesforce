@isTest
public class ExchangeCurrencyRateServiceJobTest {
    @isTest
	public static void testJob(){
      
        RateResponse__c rr =  new RateResponse__c();
        rr.Name__c = 'Rate';
        rr.Status__c = 'OK';
        rr.Body__c = '{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        insert rr;
        
        Exchange_Rate__c er = new Exchange_Rate__c();
        er.Date__c =System.Date.Today()-1;
        insert er;
 
       
       String CRON_EXP = '0 0 0 3 9 ? 2022';
       
       String jobId = System.schedule('ExchangeCurrencyRateServiceJobTest', '0 0 0 3 9 ? 2022', new ExchangeCurrencyRateServiceJob());
      
       CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered, NextFireTime FROM CronTrigger WHERE id = :jobId];
       
       System.debug(CRON_EXP +'||'+ct.CronExpression);
       System.assertEquals(CRON_EXP, ct.CronExpression);
      
         
              
     }

}