using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class OrderStatusModel
    {
        public int? statusID {  get; set; }
        public int? orderID { get; set; }
        public string? status_name { get; set; }
        public DateTime? update_datetime { get; set; }
        public string? description { get; set; }
    }
}
