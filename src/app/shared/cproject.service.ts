import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ProjectService {

    public cpid: any;
    public ev$: EventEmitter<any>
    constructor() {
        this.ev$ = new EventEmitter();

    }

    getCurrentProjectId() {
        return this.cpid != null ? this.cpid : false;
    }

    trigger() {
        console.log('Inside trigger now emitted value from the service');
        this.ev$.emit('project changed');

    }
}