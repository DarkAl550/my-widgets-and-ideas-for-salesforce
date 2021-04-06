@isTest
public class NewCardWizardControllerTest {
    @isTest 
    static void testCreateExpenseCard(){
        Contact testCon = new Contact();
        testCon.Admin__c = true;
        testCon.LastName = 'Test';
        testCon.Email = 'email@email.com';
        testCon.Password__c = '1111';
        testCon.Office__c = 'Office 1';
        insert testCon;
        
        Expense_Card__c testExCard = NewCardWizardController.createExpenseCard(String.valueOf(testCon.Id), Double.valueOf(20.00), 'Test Descript', '2020-01-01');  
        System.assertEquals(testExCard.Card_Keeper__c, testCon.Id);
        
    }
}