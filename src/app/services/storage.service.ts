import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public saveItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item as string) : undefined;
  }
}
