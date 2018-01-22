import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { GalleryMySuffix } from './gallery-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GalleryMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/galleries';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/galleries';

    constructor(private http: Http) { }

    create(gallery: GalleryMySuffix): Observable<GalleryMySuffix> {
        const copy = this.convert(gallery);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(gallery: GalleryMySuffix): Observable<GalleryMySuffix> {
        const copy = this.convert(gallery);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GalleryMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to GalleryMySuffix.
     */
    private convertItemFromServer(json: any): GalleryMySuffix {
        const entity: GalleryMySuffix = Object.assign(new GalleryMySuffix(), json);
        return entity;
    }

    /**
     * Convert a GalleryMySuffix to a JSON which can be sent to the server.
     */
    private convert(gallery: GalleryMySuffix): GalleryMySuffix {
        const copy: GalleryMySuffix = Object.assign({}, gallery);
        return copy;
    }
}
