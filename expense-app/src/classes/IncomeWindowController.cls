public with sharing class IncomeWindowController {
    @AuraEnabled
    public static void incomeBalance(Double income, Id monExId){
        Monthly_Expense__c monEx = [SELECT Balance__c FROM Monthly_Expense__c WHERE Id = :monExId];
        monEx.Balance__c += income;
        update monEx;
    }
}