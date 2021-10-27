import {Component, OnDestroy} from '@angular/core';
import {Product} from '../../models/product';
import {FavoritesService} from './favorites.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnDestroy{

  public favorites: Product[] = [];
  public subscriptions: Subscription[] = [];

  public constructor(private favoritesService: FavoritesService) {
    this.subscriptions.push(
      favoritesService.favorites$.subscribe(favorites => this.favorites = favorites)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
