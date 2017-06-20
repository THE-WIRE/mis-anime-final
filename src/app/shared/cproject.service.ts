import { Injectable } from '@angular/core';

@Injectable()
export class ProjectService {

    public cpid: any;

    getCurrentProjectId() {
        return this.cpid != null ? this.cpid : false;
    }
}