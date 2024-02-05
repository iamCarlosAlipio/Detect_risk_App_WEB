import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/Supplier';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent {
  displayedColumns: string[] = [
    'RazonSocial',
    'NombreComercial',
    'IdentificacionTributaria',
    'NumeroTelefonico',
    'CorreoElectronico',
    'SitioWeb',
    'DireccionFisica',
    'Pais',
    'FacturacionAnual',
    'FechaUltimaEdicion',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private supplierService:SupplierService,private router:Router,
    private snackBar:MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getSupplierList();
  }

  getSupplierList() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (res) => {
        alert('Proveedor eliminado')
        this.getSupplierList();
      },
      error: console.log,
    });
  }

  OpenEdit(data: Supplier){
    this.router.navigate(["Supplier/edit/" + data.Id]);
  }

  OpenView(data: Supplier){
    this.router.navigate(["Supplier/view/" + data.Id]);
  }

  OpenScrening(data: Supplier){

    const dialog = this.dialog.open(InformationComponent, { data,
    });
    
  }
}
