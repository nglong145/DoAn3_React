using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class ProductImageModel
    {
        public int productID { get; set; }
        public string? imageMain { get; set; }
        public string? imageSub1 { get; set; }
        public string? imageSub2 { get; set; }
        public string? imageSub3 { get; set; }
    }
}
