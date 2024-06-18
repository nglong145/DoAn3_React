using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class SizeModel
    {
        public int sizeID { get; set; }
        public int? productID { get; set; }
        public string? size {  get; set; }
        public int? quantity { get; set; }
    }
}
