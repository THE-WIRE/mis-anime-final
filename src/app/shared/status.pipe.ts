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
            case 4: return "Done";
            case 5: return "Sent for Review";
            case 6: return "Delivery";
            case 7: return "Retake";
            case 8: return "Approved";
            case 9: return "Revised Move Forward";
            case 10: return "Unapproved";
            case 11: return "On Hold";
            case 12: return "Out of Picture";
            default: return "N/A";
        }
    }
}