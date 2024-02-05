using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using PruebaBackend.Models;
using System.Text.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net;

namespace PruebaBackend.Data
{
    public class SupplierData
    {
        public static bool SaveSupplier(Supplier cSupplier)
        {
            using (SqlConnection oConexion = new SqlConnection(Conection.routeConection))
            {
                SqlCommand cmd = new SqlCommand("registrar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@razonSocial", cSupplier.RazonSocial);
                cmd.Parameters.AddWithValue("@nombreComercial", cSupplier.NombreComercial);
                cmd.Parameters.AddWithValue("@identificacionTributaria", cSupplier.IdentificacionTributaria);
                cmd.Parameters.AddWithValue("@numeroTelefonico", cSupplier.NumeroTelefonico);
                cmd.Parameters.AddWithValue("@correoElectronico", cSupplier.CorreoElectronico);
                cmd.Parameters.AddWithValue("@sitioWeb", cSupplier.SitioWeb);
                cmd.Parameters.AddWithValue("@direccionFisica", cSupplier.DireccionFisica);
                cmd.Parameters.AddWithValue("@pais", cSupplier.Pais);
                cmd.Parameters.AddWithValue("@facturacionAnual", cSupplier.FacturacionAnual);
                cmd.Parameters.AddWithValue("@fechaUltimaEdicion", cSupplier.FechaUltimaEdicion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static bool UpdateSupplier(Supplier cSupplier)
        {
            using (SqlConnection oConexion = new SqlConnection(Conection.routeConection))
            {
                SqlCommand cmd = new SqlCommand("modificar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", cSupplier.Id);
                cmd.Parameters.AddWithValue("@razonSocial", cSupplier.RazonSocial);
                cmd.Parameters.AddWithValue("@nombreComercial", cSupplier.NombreComercial);
                cmd.Parameters.AddWithValue("@identificacionTributaria", cSupplier.IdentificacionTributaria);
                cmd.Parameters.AddWithValue("@numeroTelefonico", cSupplier.NumeroTelefonico);
                cmd.Parameters.AddWithValue("@correoElectronico", cSupplier.CorreoElectronico);
                cmd.Parameters.AddWithValue("@sitioWeb", cSupplier.SitioWeb);
                cmd.Parameters.AddWithValue("@direccionFisica", cSupplier.DireccionFisica);
                cmd.Parameters.AddWithValue("@pais", cSupplier.Pais);
                cmd.Parameters.AddWithValue("@facturacionAnual", cSupplier.FacturacionAnual);
                cmd.Parameters.AddWithValue("@fechaUltimaEdicion", cSupplier.FechaUltimaEdicion);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public static List<Supplier> ListSupplier()
        {
            List<Supplier> oListaSupplier = new List<Supplier>();
            using (SqlConnection oConexion = new SqlConnection(Conection.routeConection))
            {
                SqlCommand cmd = new SqlCommand("listar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {

                        while (dr.Read())
                        {
                            oListaSupplier.Add(new Supplier()
                            {
                                Id = Convert.ToInt32(dr["Id"]),
                                RazonSocial = dr["RazonSocial"].ToString(),
                                NombreComercial = dr["NombreComercial"].ToString(),
                                IdentificacionTributaria = Convert.ToInt64(dr["IdentificacionTributaria"]),
                                NumeroTelefonico = dr["NumeroTelefonico"].ToString(),
                                CorreoElectronico = dr["CorreoElectronico"].ToString(),
                                SitioWeb = dr["SitioWeb"].ToString(),
                                DireccionFisica = dr["DireccionFisica"].ToString(),
                                Pais = dr["Pais"].ToString(),
                                FacturacionAnual = Convert.ToDecimal(dr["FacturacionAnual"]),
                                FechaUltimaEdicion = Convert.ToDateTime(dr["FechaUltimaEdicion"])
                            });
                        }

                    }

                    return oListaSupplier.OrderByDescending(supplier => supplier.FechaUltimaEdicion).ToList();
                }
                catch (Exception ex)
                {
                    return oListaSupplier;
                }
            }
        }

        public static Supplier GetSupplier(int Id)
        {
            Supplier cSupplier = new Supplier();
            using (SqlConnection oConexion = new SqlConnection(Conection.routeConection))
            {
                SqlCommand cmd = new SqlCommand("obtener", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            cSupplier = new Supplier()
                            {
                                Id = Convert.ToInt32(dr["Id"]),
                                RazonSocial = dr["RazonSocial"].ToString(),
                                NombreComercial = dr["NombreComercial"].ToString(),
                                IdentificacionTributaria = Convert.ToInt64(dr["IdentificacionTributaria"]),
                                NumeroTelefonico = dr["NumeroTelefonico"].ToString(),
                                CorreoElectronico = dr["CorreoElectronico"].ToString(),
                                SitioWeb = dr["SitioWeb"].ToString(),
                                DireccionFisica = dr["DireccionFisica"].ToString(),
                                Pais = dr["Pais"].ToString(),
                                FacturacionAnual = Convert.ToDecimal(dr["FacturacionAnual"]),
                                FechaUltimaEdicion = Convert.ToDateTime(dr["FechaUltimaEdicion"])
                            };
                        }

                    }

                    return cSupplier;
                }
                catch (Exception ex)
                {
                    return cSupplier;
                }
            }
        }

        public static bool DeleteSupplier(int Id)
        {
            using (SqlConnection oConexion = new SqlConnection(Conection.routeConection))
            {
                SqlCommand cmd = new SqlCommand("eliminar", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);

                try
                {
                    oConexion.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

        public async Task<Object> FindResoultEntity(int id)
        {
            List<EntityResult> entityResult = new List<EntityResult>();

            Supplier supplier = ListSupplier().Find(x => x.Id == id);

            var url = "https://localhost:44305/api/consult/"+"?Authorization=Carlos1234";
            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            };

            if (supplier == null)
            {
                throw new Exception("Proveedor no encontrado con el ID proporcionado");
            }
            else
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(url);
                    var contet = await response.Content.ReadAsStringAsync();

                    if (response.IsSuccessStatusCode)
                    {
                        try {
                            
                            entityResult = JsonSerializer.Deserialize<List<EntityResult>>(contet);

                            foreach (var item in entityResult)
                            {
                                List<EntityArray> listEntityArray = item.Array;

                                foreach (var data in listEntityArray)
                                {

                                    if (data != null && !string.IsNullOrEmpty(data.entity) && !string.IsNullOrEmpty(data.jurisdiction) && !string.IsNullOrEmpty(data.likedTo))
                                    {
                                        if ((data.entity == supplier.RazonSocial || data.entity == supplier.NombreComercial)
                                            && (data.jurisdiction == supplier.Pais || data.likedTo == supplier.Pais))
                                        {
                                            List<EntityArray> x = new List<EntityArray>();
                                            x.Add(data);

                                            EntityResult entityR = new EntityResult
                                            {
                                                Entity = item.Entity,
                                                Count = item.Count,
                                                Array = x
                                            };

                                            return entityR;
                                        }
                                    }

                                }

                            }
                                
                        }
                        catch (JsonException)
                        {
                            var errorResponse = JsonSerializer.Deserialize<ErrorResponse>(contet);

                            if (errorResponse != null && errorResponse.Error == "Número máximo de llamadas por minuto alcanzado. Intente nuevamente más tarde.")
                            {
                                return new
                                {
                                    Error = "Número máximo de llamadas por minuto alcanzado. Intente nuevamente más tarde.",
                                    Success = false
                                };
                                
                            }
                            else
                            {
                                //Console.WriteLine("Error desconocido al procesar la respuesta de la API.");
                            }
                        }

                    }

                }
            
            }


            return null;
        }

    }
}