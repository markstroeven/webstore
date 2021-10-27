import {Injectable} from '@angular/core';
import {Product} from '../../models/product';
import {BehaviorSubject} from 'rxjs';
import {StorageService} from '../../services/storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favorites: Product[] = [];
  public favorites$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.favorites);

  public constructor(private storageService: StorageService,
                     private matSnackbar: MatSnackBar) {
    this.favorites = storageService.getItem('wishlist') || [];
    this.favorites$.next(this.favorites);
  }

  public addItemToFavorites(item: Product): void {
    if (!this.favorites.find(x => x.id === item.id)) {
      this.favorites.push({...item, quantity: 1});
      this.matSnackbar.open(item.name + ' is toegevoegd aan favorieten.', 'ok', {duration: 2500});
    } else {
      this.favorites.find(x => x.id === item.id)!.quantity! += 1;
      this.matSnackbar.open(item.name + ' zat al in je favorieten, we hebben de kwantiteit met 1 opgehoogd.', 'ok', {duration: 2500});
    }
    this.storageService.saveItem('wishlist', this.favorites);
    this.favorites$.next(this.favorites);
  }

  public removeItemFromFavorites(item: Product): void {
    const index = this.favorites.indexOf(item);
    if (index !== -1) {
      this.favorites.splice(index, 1);
    }
    this.favorites$.next(this.favorites);
    this.storageService.saveItem('wishlist', this.favorites);
    this.favorites$.next(this.favorites);
    this.matSnackbar.open(item.name + ' is uit favorieten gehaald.', 'ok', {duration: 2500});
  }

  public isItemInWishlist(item: Product): boolean {
    return this.favorites.find(x => x.id === item.id) ? true : false;
  }

  public persistWishlist(): void {
    this.storageService.saveItem('wishlist', this.favorites);
  }
}
