import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BannerMySuffix } from './banner-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BannerMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/banners';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/banners';

    constructor(private http: Http) { }

    create(banner: BannerMySuffix): Observable<BannerMySuffix> {
        const copy = this.convert(banner);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(banner: BannerMySuffix): Observable<BannerMySuffix> {
        const copy = this.convert(banner);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BannerMySuffix> {
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
     * Convert a returned JSON object to BannerMySuffix.
     */
    private convertItemFromServer(json: any): BannerMySuffix {
        const entity: BannerMySuffix = Object.assign(new BannerMySuffix(), json);
        return entity;
    }

    /**
     * Convert a BannerMySuffix to a JSON which can be sent to the server.
     */
    private convert(banner: BannerMySuffix): BannerMySuffix {
        const copy: BannerMySuffix = Object.assign({}, banner);
        return copy;
    }
}
