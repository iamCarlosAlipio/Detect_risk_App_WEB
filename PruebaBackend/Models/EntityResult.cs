using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PruebaBackend.Models
{
    public class EntityResult
    {
        public string Entity { get; set; }
        public int Count { get; set; }
        public List<EntityArray> Array { get; set; }
    }
}