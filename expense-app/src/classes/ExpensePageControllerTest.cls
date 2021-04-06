@isTest
public with sharing class ExpensePageControllerTest {
    @testSetup 
    static void setup(){
        Contact c = new Contact();
        c.Admin__c = false;
        c.LastName = 'TestKeeper';
        c.Email = 'email@email.com';
        c.Password__c = '1111';
        c.Office__c = 'Office 2';
        insert c;

        Expense_Card__c testExCard1= new Expense_Card__c();
        testExCard1.Amount__c = 20;
        testExCard1.Card_Keeper__c = c.Id;
        testExCard1.CardDate__c = Date.valueOf('2020-01-01');
        testExCard1.Description__c = 'Test Description';
        insert testExCard1;
        
    }
    @isTest 
    static void testGetMonthlyExpense(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];
        
        
        Monthly_Expense__c getTestMonthEx = ExpensePageController.getMonthlyExpense(String.valueOf(c.Id), '1', '2020');
        System.assertNotEquals(getTestMonthEx, null);
        Monthly_Expense__c getTestMonthEx1 = ExpensePageController.getMonthlyExpense(String.valueOf(c.Id), '11', '2020');
        System.assertEquals(getTestMonthEx1, null);
          
    }
    @isTest
    static void testGetCardsDate(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];

        List<Date> testCardsDates = ExpensePageController.getCardsDate(c.Id, 1, '2020');
        List<Date> testCardsDates1 = ExpensePageController.getCardsDate(c.Id, 12, '2020');
        System.assert(testCardsDates.size() > 0);
        System.assert(testCardsDates1.size() == 0);  
    }
    
    @isTest
    static void testGetExCards(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];
        
        List<Expense_Card__c> testListExCards = ExpensePageController.getExCards(c.Id, '2020-01-01');
        System.assert(testListExCards.size() > 0);
    }
    
    @isTest 
    static void testDeleteExpenseCard(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];    
        Expense_Card__c ExCard = [SELECT Id, IsDeleted FROM Expense_Card__c WHERE CardDate__c = :Date.valueOf('2020-01-01')];     
        ExpensePageController.deleteExpenseCard(ExCard.Id);     
        List<Expense_Card__c> ExCards = [SELECT Id, IsDeleted FROM Expense_Card__c]; 
        System.assert(ExCards.size() == 0);
        
    }
    
    @isTest
    static void testGetYears(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];
        List<Integer> testListYears = ExpensePageController.getYears(c.Id);   
        System.assert(testListYears.size() > 0);
    }
    
    @isTest
    static void testTotalExCardAmount(){
        Contact c = [SELECT Id FROM Contact WHERE LastName = 'TestKeeper'];
        Double sum = ExpensePageController.totalExCardAmount(c.Id, '2020-01-01');
        System.assertEquals(sum, 20);
        
    }
}