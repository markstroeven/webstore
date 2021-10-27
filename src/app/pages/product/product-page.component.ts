import {AfterContentInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {ProductResource} from '../../resources/product-resource';
import {Product} from '../../models/product';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {FavoritesService} from '../../components/favorites/favorites.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {MatGridList} from '@angular/material/grid-list';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnDestroy, AfterContentInit {
  @ViewChild('grid', {read: MatGridList})
  public grid: MatGridList;
  public products: Product[] = [];
  public queryForm: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  private subscription: Subscription[] = [];
  private gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };

  public constructor(private productResource: ProductResource,
                     private favoritesService: FavoritesService,
                     private mediaObserver: MediaObserver) {
    productResource.getProducts().subscribe(products => this.products = products);
    this.subscription.push(
      this.queryForm.controls.query.valueChanges.pipe(debounceTime(200)).subscribe(query => {
        query = query.toLowerCase();
        if (query && !query.isEmpty) {
          this.products = this.products.filter(x => {
            return x.name.toLowerCase().includes(query) ||
              x.description.toLowerCase().includes(query) ||
              x.category.toLowerCase().includes(query) ||
              x.price.toString(10).toLowerCase().includes(query);
          });
        } else {
          productResource.getProducts().subscribe(products => this.products = products);
        }
      })
    );
    this.subscription.push(favoritesService.favorites$.subscribe(() => {
      this.determineProductSelection();
    }));
  }

  public ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  private determineProductSelection(): void {
    this.products.forEach(product => {
      product.isSelected = this.favoritesService.isItemInWishlist(product);
    });
  }

  public ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
    this.determineProductSelection();
  }
}
