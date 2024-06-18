using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class OrdersModel
    {
        public long? RowNumber { get; set; }
        public int orderID { get; set; }
        public int? customerID { get; set; }
        public string? fullName { get; set; }
        public string? phone {  get; set; }
        public DateTime? created_date { get; set; }
        public decimal? total_amount { get; set; }
        public string? delivery_address { get; set; }
        public List<OrderItemModel>? list_json_orderitems { get; set; }
        public List<OrderStatusModel>? orderStatus { get; set; }
        public List<PaymentModel>? payments { get; set; }
        public List<ProductModel>? products { get; set; }
    }
}
