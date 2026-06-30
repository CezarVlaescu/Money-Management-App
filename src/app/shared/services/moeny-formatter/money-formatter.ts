import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoneyFormatter {
  public format(value: number, currency = 'RON'): string {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  }

  public formatWithDecimals(value: number, currency = 'RON'): string {
    return new Intl.NumberFormat('ro-RO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}
