import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProductPageComponent} from './product-page.component';
import {productPageMaterialImports} from './product-page-material';
import {ProductModule} from '../../components/product/product.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [{
  path: '',
  component: ProductPageComponent
}];

@NgModule({
  declarations: [ProductPageComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    productPageMaterialImports,
    ProductModule,
    ReactiveFormsModule
  ]
})
export class ProductPageModule {

}
