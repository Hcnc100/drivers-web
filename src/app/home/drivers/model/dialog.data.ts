import { DialogAction } from "../../../shared/model/Dialog.action";

export interface DialogData<T> {
    action: DialogAction;
    data?: T;
}