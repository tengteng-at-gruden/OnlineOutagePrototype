///<reference path="../jquery/jquery.d.ts"/>
interface IRadioButtonOption {
    className?: string;
    checkedClass?: string;
}

interface JQuery {
    radiobutton(val: IRadioButtonOption):JQuery;
}