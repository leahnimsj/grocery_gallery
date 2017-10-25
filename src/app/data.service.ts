import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/empty';

@Injectable()
export class DataService {

    private baseUrl = 'https://grocery-gallery.herokuapp.com/'
    private trashUrl = 'https://grocery-gallery.herokuapp.com/trash/'
    private fridgeUrl = 'https://grocery-gallery.herokuapp.com/fridge/'
    private groceryUrl = 'https://grocery-gallery.herokuapp.com/grocery/'
    private finishUrl = 'https://grocery-gallery.herokuapp.com/finish/'
    private mailUrl = 'https://grocery-gallery.herokuapp.com/grocery/mail'
    private searchUrl = 'https://grocery-gallery.herokuapp.com/search?query='
    private alertUrl = 'https://grocery-gallery.herokuapp.com/fridge/count?level='
    private options = {
        withCredentials: true
    }

    found = false;

    constructor (private http: Http) {}

    // this is the service call for fridge list and grocery list - need to pass in string from components

    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint;

        return this.http.get(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecord(endpoint: string, id): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.get(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRecord(endpoint: string, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.delete(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.put(apiUrl, record, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addRecord(endpoint: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record, this.options)
            .map(this.extractData);
    }

    logOut(endpoint: string): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        return this.http.delete(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    // this method is for sending things to the trash
    manageFridgeRecord(endpoint: string, id:number): Observable<any> {
        let apiUrl = `${this.fridgeUrl}${id}/${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, id, this.options)
            .map(this.extractData);
    }

    // this method is for sending things to grocery list from fridge
    moveFridgeRecord(endpoint: string, id:number, record:object): Observable<any> {
        let apiUrl = `${this.fridgeUrl}${id}/${endpoint}`;
        console.log(apiUrl)
        console.log(record)
        return this.http.post(apiUrl, record, this.options)
            .map(this.extractData);
    }



    manageGroceryRecord(endpoint: string, id:number): Observable<any> {
        let apiUrl = `${this.groceryUrl}${id}/${endpoint}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, this.options)
            .map(this.extractData);
    }




    getTrash(endpoint: string): Observable<any[]> {
        let apiUrl = this.trashUrl+endpoint;
        return this.http.get(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    postEmail(record:object): Observable<any> {
        return this.http.post(this.mailUrl, record, this.options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    getFoodSearch(searchTerm: string): Observable<any[]> {
        let apiUrl = this.searchUrl+searchTerm;

        return this.http.get(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAlerts(level: string): Observable<any> {
        let apiUrl = this.alertUrl+level;
        console.log(apiUrl)

        return this.http.get(apiUrl, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
        }
        return Observable.throw(errMsg);
    }


}
