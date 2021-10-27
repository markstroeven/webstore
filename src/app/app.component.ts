import {Component, OnDestroy} from '@angular/core';
import {FavoritesService} from './components/favorites/favorites.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public amountOfItemsInFavorites = 0;
  private subscriptions: Subscription[] = [];

  public constructor(private favoritesService: FavoritesService) {
    this.subscriptions.push(this.favoritesService.favorites$.subscribe(favorites => this.amountOfItemsInFavorites = favorites.length));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
