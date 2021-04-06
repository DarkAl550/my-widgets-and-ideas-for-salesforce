@isTest
public class ExpenseCardTriggerTest {
	@isTest
    static void testTrigger(){
        Contact c = new Contact();
        c.Admin__c = true;
        c.LastName = 'TestKeeper';
        c.Email = 'email@email.com';
        c.Password__c = '1111';
        c.Office__c = 'Office 2';
        insert c;
        
        Expense_Card__c testExCard1= NewCardWizardController.createExpenseCard(c.Id, 20, 'Test1', '2020-01-01');
        Expense_Card__c testExCard2= NewCardWizardController.createExpenseCard(c.Id, 30, 'Test2', '2020-01-01');
        Expense_Card__c testExCard3= NewCardWizardController.createExpenseCard(c.Id, 30, 'Test3', '2020-12-01');
        List<Monthly_Expense__c> getTestMonCard = [SELECT Id FROM Monthly_Expense__c];
        System.assert(getTestMonCard.size() == 2);
    }
}