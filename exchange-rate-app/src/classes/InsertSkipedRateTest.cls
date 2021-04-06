@isTest
public class InsertSkipedRateTest {
	@testSetup 
    static void setup() {
        RateResponse__c rr =  new RateResponse__c();
        rr.Name__c = 'Rate';
        rr.Status__c = 'OK';
        rr.Body__c = '{"rates":{"EUR":0.8920606601},"base":"USD","date":"2020-06-19"}';
        insert rr;
        List<Log__c> logs = new List<Log__c>();
        List<Exchange_Rate__c> rates = new List<Exchange_Rate__c>();
        
        for (Integer i=0;i<10;i++) {
            Log__c log = new Log__c(Status_Code__c='ERROR');
            insert log;
        }
        
        
        for (Log__c log : [select id from Log__c]) {
            Exchange_Rate__c rate = new Exchange_Rate__c(Name='TestRate', Base_Currency__c='GBP',
                 Log__c=log.id);
            insert rate;
        }
        
    }
    static testmethod void test() {        
        Test.startTest();
        InsertSkipedRate uca = new InsertSkipedRate();
        Id batchId = Database.executeBatch(uca);
        Test.stopTest();
        // after the testing stops, assert records were updated properly
        System.assertEquals(0, [select count() from Exchange_Rate__c where Log__r.Status_Code__c = 'OK']);
    }
}