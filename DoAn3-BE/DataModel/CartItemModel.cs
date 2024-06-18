using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class CartItemModel
    {
        public int? accountID { get; set; }
        public int? cart_itemID { get; set; }
        public int? cartID { get; set; }
        public int? productID { get; set; }
        public int? quantity { get; set; }
        public decimal? price { get; set; }
        public string? size { get; set; }

    }
}
