import { EntityArray } from './../../models/EntityArray';
import { Supplier } from './../../models/Supplier';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  auxSupplier!: Supplier;
  entityArray!: EntityArray[];
  myForm!: FormGroup;
  conditional:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private dialogRef: MatDialogRef<InformationComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Supplier
  ) {
    this.auxSupplier=data;
  }

  ngOnInit(){
    this.reactiveForm();
  }

  reactiveForm():void {
    this.myForm = this.formBuilder.group({
      entity: '',
      jurisdiction: '',
      likedTo: '',
      dataFrom: '',
    });
    
  }

  inicialization(): void{
    this.supplierService.screningEntityResolut(this.auxSupplier.Id).subscribe({
      next: (obj) => {
    
        console.log(obj);

        if(obj){
          if ('Array' in obj) {
            this.conditional=true
            this.entityArray = obj.Array;
            this.myForm.get("entity")?.setValue(this.entityArray[0].entity);
            this.myForm.get("jurisdiction")?.setValue(this.entityArray[0].jurisdiction);
            this.myForm.get("likedTo")?.setValue(this.entityArray[0].likedTo);
            this.myForm.get("dataFrom")?.setValue(this.entityArray[0].dataFrom);
      
            setTimeout(function () {
              alert('El Proveedor está en riesgo');
            }, 300);
          }else{
            alert(obj.Error);
          } 
        }else{
          setTimeout(function () {
            alert('El Proveedor no está en riesgo');
          }, 300);
        }
      },
    });
    
  }

  onRadioChange(event: any): void {
    const selectedValue = event.value;

    if (selectedValue === '1') {
      console.log(this.conditional)
      this.inicialization();
    }
  }

  closeDialog(){
    this.dialogRef.close(true);
  }

}
