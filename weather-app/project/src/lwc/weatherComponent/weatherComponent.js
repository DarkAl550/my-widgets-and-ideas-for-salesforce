import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getWeather from '@salesforce/apex/WeatherService.runService';
import findForecasts from '@salesforce/apex/WeatherComponentComtroller.findForecasts';
import getForecastsNameToAccordion from '@salesforce/apex/WeatherComponentComtroller.getForecastsNameToAccordion';
import getForecaststoDatatable from '@salesforce/apex/WeatherComponentComtroller.getForecaststoDatatable';
 
const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Time', fieldName: 'Time__c', type: 'date',typeAttributes: {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                    hour12: true}},   
    { label: 'Temperature(°C)', fieldName: 'Temperature__c' },
    { label: 'Weather Message ', fieldName: 'WeatherMessage__c' },
];

export default class WeatherComponent extends LightningElement {
    forecastsToAccordions = [];
    selectedAccordion;
    searchValue;
    error;
    forecasts = [];
    columns = columns;
    isTrue;

    handleToggleSection(event) {
        this.selectedAccordion = event.detail.openSections;
        getForecaststoDatatable( { forecastName : this.selectedAccordion } )
            .then(result => {  
                this.forecasts = result;
            })
            .catch(error => {  
                this.error = error;  
            });
    }

    connectedCallback(){
        this.isTrue = false;
        getForecastsNameToAccordion()
            .then(result => {  
                this.forecastsToAccordions = result;
                this.isTrue = true;
            })
            .catch(error => {  
                this.error = error;  
            });
    } 

    handleKeyUp(event){
        const isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            this.isTrue = false;
            this.searchValue = event.target.value;
            if(this.searchValue === ""){
                getForecastsNameToAccordion()
                .then(result => {  
                    this.forecastsToAccordions = result;
                    this.isTrue = true;
                })
                .catch(error => {  
                    this.error = error;  
                });
            }else{
                
                getWeather({ searchValue : this.searchValue })
                .then(result => {  
                    console.log('getWeather: '+result);
                    findForecasts({ searchValue : this.searchValue })
                    .then(r=>{
                        this.forecastsToAccordions = r;
                        console.log(this.forecastsToAccordions);
                        console.log('Success');
                        this.isTrue = true;
                    })
                    .catch(error => {  
                        this.error = error;  
                        console.log('Error');   
                        this.isTrue = true;
                        const event = new ShowToastEvent({
                            title: 'City not found!',
                            message: 'Try enter new city!',
                        });
                        this.dispatchEvent(event);
                        getForecastsNameToAccordion()
                        .then(result => {  
                            this.forecastsToAccordions = result;
                            this.isTrue = true;
                        })
                        .catch(error => {  
                            this.error = error;  
                        });
                    });
                    
                })
                .catch(error => {  
                    this.error = error;  
                    console.log('Error');   
                });
            }
        }
    }

    handleSearch(){
        this.searchValue = this.template.querySelector('lightning-input').value;
        this.isTrue = false;
        if(this.searchValue === ""){
            getForecastsNameToAccordion()
            .then(result => {  
                this.forecastsToAccordions = result;
                this.isTrue = true;
            })
            .catch(error => {  
                this.error = error;  
            });
        }else{
            getWeather({ searchValue : this.searchValue })
                .then(result => {  
                    console.log('getWeather: '+result);
                    findForecasts({ searchValue : this.searchValue })
                    .then(r=>{
                        this.forecastsToAccordions = r;
                        console.log(this.forecastsToAccordions);
                        console.log('Success');
                        this.isTrue = true;
                    })
                    .catch(error => {  
                        this.error = error;  
                        console.log('Error');   
                        this.isTrue = true;
                        const event = new ShowToastEvent({
                            title: 'City not found!',
                            message: 'Try enter new city!',
                        });
                        this.dispatchEvent(event);
                        getForecastsNameToAccordion()
                        .then(result => {  
                            this.forecastsToAccordions = result;
                            this.isTrue = true;
                        })
                        .catch(error => {  
                            this.error = error;  
                        });   
                    });
                    
                })
                .catch(error => {  
                    this.error = error;  
                    console.log(this.error);   
                });
        }
    }

}