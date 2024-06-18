using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class ImportItemModel
    {
        public int? ioItemID { get; set; }
        public int? import_orderID { get; set; }
        public int? productID { get; set; }
        public string? product_name { get; set; }
        public int? quantity { get; set; }
        public decimal? price { get; set; }
        public string? size { get; set; }
    }
}
