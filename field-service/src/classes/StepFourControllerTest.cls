@isTest
public with sharing class StepFourControllerTest {
    @TestSetup
    static void setup(){
        Product2 testProduct = new Product2();
        testProduct.Name = 'Test Product';
        testProduct.IsActive = true;
        insert testProduct;

        Schema.Location testLocation = new Schema.Location();
        testLocation.Name = 'Test Location';
        testLocation.LocationType ='Warehouse';
        insert testLocation;
    }

    @isTest 
    static void testGetProduts(){
        List<Product2> testListProducts = StepFourController.getProduts();
        System.assert(testListProducts.size() > 0);
    }

    @isTest 
    static void testGetLocation(){
        List<Schema.Location> testListLocation = StepFourController.getLocation();
        System.assert(testListLocation.size() > 0);
    }

    @isTest 
    static void testSaveProductItem(){
        Product2 p = [SELECT Id FROM Product2 WHERE Name='Test Product'];
        Schema.Location testLocation = new Schema.Location();
        testLocation.Name = 'Test Location';
        testLocation.LocationType ='Warehouse';
        insert testLocation;
        
        StepFourController.saveProductItem(p.Id, testLocation.Id, 'Each', 2, '0001');
        List<ProductItem> testListProductItem = [SELECT Id FROM ProductItem];
        System.assert(testListProductItem.size() >0);
    }
}