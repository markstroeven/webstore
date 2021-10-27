import {NgModule} from '@angular/core';
import {ProductItemComponent} from './item/product-item.component';
import {CommonModule} from '@angular/common';
import {productMaterialImports} from './product-material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, productMaterialImports, MatFormFieldModule, FormsModule, MatInputModule, MatTooltipModule],
  exports: [ProductItemComponent]
})
export class ProductModule {

}
