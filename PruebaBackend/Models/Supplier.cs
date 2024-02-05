using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaBackend.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string RazonSocial { get; set; }
        public string NombreComercial { get; set; }
        public long IdentificacionTributaria { get; set; }
        public string NumeroTelefonico { get; set; }
        public string CorreoElectronico { get; set; }
        public string SitioWeb { get; set; }
        public string DireccionFisica { get; set; }
        public string Pais { get; set; }
        public decimal FacturacionAnual { get; set; }
        public DateTime FechaUltimaEdicion { get; set; }
    }
}