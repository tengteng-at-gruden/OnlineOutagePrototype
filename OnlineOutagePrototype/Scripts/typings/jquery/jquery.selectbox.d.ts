///<reference path="../jquery/jquery.d.ts"/> 

interface ISelectboxOption {
    classHolder?: string;
    classHolderDisabled?: string;
    classSelector?: string;
    classOptions?: string;
    classDisabled?: string;
    classFocus?: string;
    classGroup?: string;
    classSub?: string;
    classToggleOpen?: string;
    classToggle?: string;
    effect?: string;
    speed?: string;
}

interface JQuery {
    selectbox(val: ISelectboxOption): JQuery;
}