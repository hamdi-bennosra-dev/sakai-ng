import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private messageService: MessageService) { }

    showSuccess(detail?: string, summary?: string) {
        this.messageService.add({ severity: 'success', summary: summary ?? 'Success', detail: detail ?? 'Successful Operation' });
    }

    showInfo(detail?: string, summary?: string) {
        this.messageService.add({ severity: 'info', summary: summary ?? 'Info', detail: detail ?? '...' });
    }

    showWarn(detail?: string, summary?: string) {
        this.messageService.add({ severity: 'warn', summary: summary ?? 'Warn', detail: detail ?? 'Attention' });
    }

    showError(detail?: string, summary?: string) {
        this.messageService.add({ severity: 'error', summary: summary ?? 'Error', detail: detail ?? 'An error has happened' });
    }
}