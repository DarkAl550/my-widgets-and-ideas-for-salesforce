public with sharing class StepFourController {
    @AuraEnabled
    public static List<Product2> getProduts(){
        return [SELECT Id, Name FROM Product2];
    }

    @AuraEnabled
    public static List<Schema.Location> getLocation(){
        return [SELECT Id, Name FROM Location];
    }

    @AuraEnabled
    public static void saveProductItem(Id product, Id location, String unitOfMeasure, Double quantity, String serialNumber){
        ProductItem newProductItem = new ProductItem();
        newProductItem.Product2Id = product;
        newProductItem.LocationId = location;
        newProductItem.QuantityUnitOfMeasure = unitOfMeasure;
        newProductItem.QuantityOnHand = quantity;
        newProductItem.SerialNumber = serialNumber;
        System.debug(newProductItem);
        insert newProductItem;
    }
}