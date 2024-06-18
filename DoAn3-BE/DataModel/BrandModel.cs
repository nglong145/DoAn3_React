using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class BrandModel
    {
        public int brandID { get; set; }
        public string? brand_name { get; set;}
        public string? brand_tag { get; set; }
        public string? brand_image { get; set; }
        public string? descriptions { get; set; }
    }
}
