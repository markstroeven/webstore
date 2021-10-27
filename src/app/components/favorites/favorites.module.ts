import {NgModule} from '@angular/core';
import {FavoritesComponent} from './favorites.component';
import {CommonModule} from '@angular/common';
import {favoritesMaterialImports} from './favorites.material';
import {ProductModule} from '../product/product.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    favoritesMaterialImports,
    ProductModule
  ],
  exports: [FavoritesComponent]
})
export class FavoritesModule {

}
