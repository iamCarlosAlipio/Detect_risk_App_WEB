export interface Supplier {
    Id: number;
    RazonSocial: string;
    NombreComercial: string;
    IdentificacionTributaria: bigint;
    NumeroTelefonico: string;
    CorreoElectronico: string;
    SitioWeb: string;
    DireccionFisica: string;
    Pais: string;
    FacturacionAnual: number;
    FechaUltimaEdicion: Date;
  }