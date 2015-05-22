/// <reference path='../_all.ts' />

module map {
    export interface IVcRecaptha {

        getRecaptcha();
        validateRecaptchaInstance();
        create(elm, key, fn, conf);
        reload(widgetId);
        getResponse(widgetId);
    }
}