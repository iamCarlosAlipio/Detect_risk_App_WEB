import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/Supplier';
import { SupplierService } from 'src/app/services/supplier.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent {

  constructor(private supplierService:SupplierService, private formBuilder:FormBuilder,
    private activatedRouter: ActivatedRoute,private router:Router, private snackBar:MatSnackBar,
    private renderer: Renderer2) {}

  myForm!:FormGroup
  id = this.activatedRouter.snapshot.params["id"];
  countries: string[] = [];
  condition!: boolean

  ngOnInit(){
    this.Contiditon();
    this.reactiveForm();
    this.loadCountry();
  }

  reactiveForm():void {
    console.log(this.condition);

    this.myForm = this.formBuilder.group({
      Id:[""],
      RazonSocial: ['', Validators.required],
      NombreComercial: ['', Validators.required],
      IdentificacionTributaria: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      NumeroTelefonico: ['', [Validators.required,Validators.pattern(/^\+?[0-9]+(?:[\s\-]?[0-9]+)*$/)]],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      SitioWeb: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)]], // Enlace con redirección a la página web
      DireccionFisica: ['', Validators.required],
      Pais: ['', Validators.required],
      FacturacionAnual: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      FechaUltimaEdicion: ['', {
        validators: [Validators.required],
        asyncValidators: [this.fechaPasadaAsyncValidator()],
        updateOn: 'blur'
      }],
      Hora: ['', [Validators.required, this.customTimeValidator]],
    });

    this.supplierService.getSupplier(this.id).subscribe({
      next: (data:Supplier)=>{
        this.myForm.patchValue(data);
        this.myForm.get("Pais")?.setValue(data.Pais);
        this.myForm.get("Pais")?.updateValueAndValidity()

        const fecha=new Date(data.FechaUltimaEdicion)
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        const horaFormateada = `${hora}:${minutos}:${segundos}`;
        this.myForm.get("Hora")?.setValue(horaFormateada);

      }
    });
  }

  AcctionSupplier():void { 
    //editar
    if(!this.condition){
      
      const fechaUltimaEdicion: Date = new Date(this.myForm.get("FechaUltimaEdicion")!.value);
      const tiempoAsumar: string = this.myForm.get("Hora")!.value
      const fechaConTiempo: string = `${fechaUltimaEdicion.toISOString().split('T')[0]}T${tiempoAsumar}Z`;

      if(!this.myForm.invalid){
        const supplier:Supplier = {
          Id: parseInt(this.myForm.get("Id")!.value),
          RazonSocial: this.myForm.get("RazonSocial")!.value,
          NombreComercial: this.myForm.get("NombreComercial")!.value,
          IdentificacionTributaria: this.myForm.get("IdentificacionTributaria")!.value,
          NumeroTelefonico: this.myForm.get("NumeroTelefonico")!.value,
          CorreoElectronico: this.myForm.get("CorreoElectronico")!.value,
          SitioWeb: this.myForm.get("SitioWeb")!.value,
          DireccionFisica: this.myForm.get("DireccionFisica")!.value,
          Pais: this.myForm.get("Pais")!.value,
          FacturacionAnual:this.myForm.get("FacturacionAnual")!.value,
          FechaUltimaEdicion: new Date(fechaConTiempo)
        }
    
        this.supplierService.updateSupplier(supplier).subscribe({
          next: (data)  => {
            alert('Proveedor editado');
            this.router.navigate([""]);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }else{
        this.snackBar.open('Por favor, completa correctamente todos los campos', 'OK', { duration: 5000 });
      }
    }else{
      this.router.navigate([""]);
    }
  
  }

  fechaPasadaAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const fechaIngresada = control.value;
      const fechaActual = new Date();

      if (fechaIngresada > fechaActual) {
        return of({ fechaInvalida: true });
      }

      return of(null);
    };
  }

  customTimeValidator(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
  
    const validTimeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(control.value);
    return validTimeFormat ? null : { invalidTimeFormat: true };  
  }

  private Contiditon(): void{
    if (this.activatedRouter.snapshot.params["tipo"] === "edit") {
      this.condition=false;
    }
    else{
      this.condition=true;
    }
  }

  loadCountry():void{
    this.countries = [
      "Afganistan", "Albania", "Alemania", "Algeria", "Andorra", "Angola", "Anguilla",
      "Antigua y Barbuda", "Antillas Holandesas", "Arabia Saudita", "Argentina", "Armenia", "Aruba",
      "Australia", "Austria", "Azerbaiyan", "Bahamas", "Bahamas", "Bahrein", "Bangladesh", "Barbados", "Belgica",
      "Belice", "Benin", "Bermudas", "Bielorrusia", "Bolivia", "Bosnia y Herzegovina", "Botsuana",
      "Brasil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Butan", "Cabo Verde", "Camerun", "Canada", "Chad",
      "Chile", "China", "Chipre", "Colombia", "Comores", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook, Islas",
      "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca",
      "Djibouti, Yibuti", "Ecuador", "Egipto", "El Salvador", "Emiratos Arabes Unidos", "Eritrea", "Eslovaquia",
      "Eslovenia", "Espana", "Estados Unidos", "Estonia", "Etiopia", "Feroe, Islas", "Filipinas", "Finlandia", "Fiyi",
      "Francia", "Gabon", "Gambia", "Georgia", "Ghana", "Gibraltar", "Granada", "Grecia", "Groenlandia", "Guadalupe",
      "Guatemala", "Guernsey", "Guinea", "Guinea Ecuatorial", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
      "Hungria", "India", "Indonesia", "Irak", "Iran", "Irlanda", "Isla Pitcairn", "Islandia", "Islas Salomon",
      "Islas Turcas y Caicos", "Islas Virgenes Britanicas", "Israel", "Italia", "Jamaica", "Japon", "Jersey", "Jordania",
      "Kazajstan", "Kenia", "Kirguistan", "Kiribati", "Kuwait", "Laos", "Lesotho", "Letonia", "Libano", "Liberia",
      "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia", "Madagascar", "Malasia", "Malawi", "Maldivas",
      "Mali", "Malta", "Man, Isla de", "Marruecos", "Martinica", "Mauricio", "Mauritania", "Mexico", "Moldavia", "Monaco",
      "Mongolia", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria", "Norfolk Island",
      "Noruega", "Nueva Caledonia", "Nueva Zelanda", "Oman", "Paises Bajos, Holanda", "Pakistan", "Panama",
      "Papua-Nueva Guinea", "Paraguay", "Peru", "Polinesia Francesa", "Polonia", "Portugal", "Puerto Rico", "Qatar",
      "Reino Unido", "Republica Checa", "Republica Dominicana", "Reunion", "Ruanda", "Rumania", "Rusia",
      "Sahara Occidental", "Samoa", "San Cristobal y Nevis", "San Marino", "San Pedro y Miquelon", "San Tome y Principe",
      "San Vincente y Granadinas", "Santa Elena", "Santa Lucia", "Senegal", "Serbia y Montenegro", "Seychelles",
      "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudafrica", "Sud",
      "Bahamas", "British Virgin Islands", "Panama", "Seychelles"
    ];
    
  }

}
