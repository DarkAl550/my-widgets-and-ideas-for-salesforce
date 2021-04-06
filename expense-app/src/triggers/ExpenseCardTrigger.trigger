trigger ExpenseCardTrigger on Expense_Card__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    
    if(Trigger.isInsert && Trigger.isBefore){
        //code
        for(Expense_Card__c newExCard : Trigger.new){
           
            try{
            	List<Monthly_Expense__c> getMonEx = [SELECT Id FROM Monthly_Expense__c WHERE Month_Date__c = THIS_MONTH ORDER BY Month_Date__c DESC];
                System.debug(getMonEx.size());
                newExCard.MonthlyExpense__c = getMonEx[0].Id;
                System.debug('USE');
            }catch(Exception ex){
                System.debug(ex);
                Monthly_Expense__c newMonEx = new Monthly_Expense__c();
                newMonEx.Month_Date__c = newExCard.CardDate__c;
                newMonEx.Keeper__c = newExCard.Card_Keeper__c;
                insert newMonEx;
                newExCard.MonthlyExpense__c = newMonEx.Id;
                System.debug('Create');
            }
            
            
            
            System.debug(newExCard);
        }    
    }
}