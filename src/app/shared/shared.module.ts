import { NgModule } from '@angular/core';

import { msToHmsPipe } from './mstohms.pipe';
import { StatusPipe } from './status.pipe'

@NgModule({
    imports: [],
    exports: [
        msToHmsPipe,
        StatusPipe
    ],
    declarations: [
        msToHmsPipe,
        StatusPipe
    ],
    providers: [],
})
export class SharedModule { }
