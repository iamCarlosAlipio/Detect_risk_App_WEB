import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSupplierComponent } from './components/list-supplier/list-supplier.component';
import { EditSupplierComponent } from './components/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';


const routes: Routes = [
  {path:'Supplier',component:AddSupplierComponent},
  {path:'Supplier/:tipo/:id',component:EditSupplierComponent},
  {path:'',component:ListSupplierComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
