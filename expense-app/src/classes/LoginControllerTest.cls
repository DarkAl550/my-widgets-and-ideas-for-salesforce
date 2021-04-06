@isTest
public with sharing class LoginControllerTest {
    @isTest static void testCheckLoginData(){
        Contact testCon = new Contact();
        testCon.Admin__c = true;
        testCon.LastName = 'Test';
        testCon.Email = 'email@email.com';
        testCon.Password__c = '1111';
        testCon.Office__c = 'Office 1';
        insert testCon;
        Contact tested = LoginController.checkLoginData(testCon.Email, testCon.Password__c);
        System.assertEquals(tested.Admin__c, true);
    }
}