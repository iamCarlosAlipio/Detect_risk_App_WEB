using PruebaBackend.Data;
using PruebaBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace PruebaBackend.Controllers
{
    public class SupplierController : ApiController
    {
        // GET api/<controller>
        public List<Supplier> Get()
        {
            return SupplierData.ListSupplier();
        }

        // GET api/<controller>/5
        public Supplier Get(int Id)
        {
            return SupplierData.GetSupplier(Id);
        }

        // POST api/<controller>
        public bool Post([FromBody] Supplier cSupplier)
        {
            return SupplierData.SaveSupplier(cSupplier);
        }

        // PUT api/<controller>/5
        public bool Put([FromBody] Supplier cSupplier)
        {
            return SupplierData.UpdateSupplier(cSupplier);
        }

        // DELETE api/<controller>/5
        public bool Delete(int Id)
        {
            return SupplierData.DeleteSupplier(Id);
        }

        [HttpGet]
        [Route("api/Supplier/screening/{Id}")]
        public async Task<Object> FindResoult(int Id)
        {
            SupplierData supplierDataInstance = new SupplierData(); // Crear una instancia
            Object result = await supplierDataInstance.FindResoultEntity(Id);
            return result;
        }

  
    }
}
