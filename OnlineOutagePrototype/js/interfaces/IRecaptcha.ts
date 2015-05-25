/// <reference path='../_all.ts' />

module map {
    export interface IRecaptcha {
        getRecaptcha();
        validateRecaptchaInstance();
        create(elm, key, fn, conf);
        reload(widgetId);
        getResponse(widgetId);
    }
}