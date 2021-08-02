import { Injectable } from '@angular/core';
import { IServerError, INavigationError } from '../models/server-error.models';

@Injectable({
  providedIn: 'root'
})
export class ErrorUtilitiesService {

    parseFieldErrors(error: IServerError) {
        const parsedErrors: Array<{ fieldName: string, errorMessage: string }> = [];
        if (error && error.details && error.details.length > 0) {
            error.details.forEach((detail: { target: any; message: any; }) => {
                const fieldName = detail.target;
                const errorMessage = detail.message ? detail.message : error.message;
                parsedErrors.push({ fieldName: fieldName, errorMessage: errorMessage });
            });
        }
        return parsedErrors;
    }

    parseModelErrors(error: IServerError | string) {
        if (error && (<IServerError>error).message) {
            return [(<IServerError>error).message];
        }
        return [<string>error];
    }

    parseNavigationError(error: INavigationError) {
        let errorsFromServer: any = [];
        if (error) {
            if (error.message) {
                errorsFromServer = this.parseServerError(error.message);
            } else if (error.serverError) {
                errorsFromServer = this.parseServerError(error.serverError);
            }
        }
        return errorsFromServer;
    }

    parseServerError(error: IServerError | string) {
        let errorsFromServer: Array<string> = [];
        if (typeof error === 'string') {
            errorsFromServer = [error];
        } else if (error) {
            if (error.details && error.details.length > 0) {
                error.details.forEach(detail => {
                    const errorMessage = detail.message ? detail.message : error.message;
                    errorsFromServer.push(errorMessage);
                });
            }
            if (error.message) {
                if (!errorsFromServer.find(detailError => {
                    return detailError === error.message;
                })) {
                    errorsFromServer.unshift(error.message);
                }
            }
        }

        return errorsFromServer;
    }
}
