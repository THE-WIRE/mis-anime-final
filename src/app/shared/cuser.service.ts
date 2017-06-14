import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    public cuid: any;

    getCurrentUserId() {
        return this.cuid != null ? this.cuid : false;
    }
}