import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})

export class StatusPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {

        switch (value) {
            case 0: return "Awaiting Inventory";
            case 1: return "Inventory";
            case 2: return "WIP";
            case -1: return "Paused WIP";
            case 3: return "Done";
            case 4: return "Sent for Review";
            case 5: return "Delivery";
            case 6: return "Retake";
            case 7: return "Approved";
            case 8: return "Revised Move Forward";
            case 9: return "Unapproved";
            case 10: return "On Hold";
            case 11: return "Out of Picture";
            default: return "N/A";
        }
    }
}