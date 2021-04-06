public with sharing class NewCardWizardController {
    @AuraEnabled
    public static Expense_Card__c createExpenseCard(String keeperId, Double amount, String description, String cardDate){
        Expense_Card__c newcard = new Expense_Card__c();
        newCard.Card_Keeper__c = keeperId;
        newCard.Amount__c = amount;
        newCard.Description__c = description;
        newCard.CardDate__c = Date.valueOf(cardDate);
        
        insert newCard;
        System.debug(newCard);
        return newCard;
    }
}