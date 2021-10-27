import {Component, Input} from '@angular/core';
import {Product} from '../../../models/product';
import {FavoritesService} from '../../favorites/favorites.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input()
  public product: Product;

  @Input()
  public mode = 'default';

  public constructor(private favoritesService: FavoritesService) {
  }

  public addToFavorites(item: Product): void {
    this.favoritesService.addItemToFavorites(item);
  }

  public removeFromFavorites(item: Product): void {
    this.favoritesService.removeItemFromFavorites(item);
  }

  public persistWishlisht(newValue: any): void{
    console.log(newValue);
    this.favoritesService.persistWishlist();
  }

}
