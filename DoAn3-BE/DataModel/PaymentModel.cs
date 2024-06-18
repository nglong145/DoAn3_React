using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class PaymentModel
    {
        public int? paymentID { get; set; }
        public int? orderID { get; set; }
        public string? paymentMethod { get; set; }
        public DateTime? paymentTime { get; set; }
        public string? status { get; set; }
    }
}
