/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

//Reference to MSTR Embeddeding API as SFDC static resource
import embeddinglib from '@salesforce/resourceUrl/embeddinglib';

export default class Dossier extends LightningElement {
    renderedCallback(){
        loadScript(this, embeddinglib)
        .then(() => { 
          var placeholderDiv = this.template.querySelector("div.dossierContainer");
          var parent = placeholderDiv.parentNode;
          var bounds = parent.getBoundingClientRect();

          microstrategy.dossier.create({
            placeholder: placeholderDiv,
            containerHeight: bounds.height,
            containerWidth: bounds.width,
            url: "https://env-144069.customer.cloud.microstrategy.com/MicroStrategyLibrary/app/B7CA92F04B9FAE8D941C3E9B7E0CD754/12F6FA5611E9E71E1DAE0080EFD5B758/K53--K46"
          });   
        })
        .catch(function(error){
          console.log(error);
        });
    }      
}