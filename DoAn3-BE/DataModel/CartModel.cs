using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class CartModel
    {
        public int? cartID { get; set; }
        public int? customerID { get; set; }
        public DateTime? created_date { get; set; }
        public List<CartItemModel>? cart_items { get; set; }
        public List<ProductModel>? products { get; set;}
    }
}
