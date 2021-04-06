@isTest
public with sharing class IncomeWindowControllerTest {
    @isTest
    static void testIncomeBalance(){
        Contact c = new Contact();
        c.Admin__c = true;
        c.LastName = 'Test';
        c.Email = 'email@email.com';
        c.Password__c = '1111';
        c.Office__c = 'Office 1';
        insert c;

        Monthly_Expense__c monEx = new Monthly_Expense__c();
        monEx.Balance__c = 0;
        monEx.Month_Date__c = Date.valueOf('2020-01-01');
        monEx.Keeper__c = c.Id;
        insert monEx;

        IncomeWindowController.incomeBalance(20, monEx.Id);
        Monthly_Expense__c testMonEx = [SELECT Balance__c FROM Monthly_Expense__c WHERE Id = :monEx.Id ];

        System.assertEquals(testMonEx.Balance__c, Double.valueOf(20));
    }
}