import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ToastMessage, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent implements OnInit {
  private readonly toastService = inject(ToastService);

  toast: ToastMessage | null = null;

  ngOnInit(): void {
    this.toastService.toast$.subscribe((message) => {
      this.toast = message;
    });
  }
}
