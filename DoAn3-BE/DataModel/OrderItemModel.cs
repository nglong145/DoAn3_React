﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class OrderItemModel
    {
        public int? order_itemID { get; set; }
        public int? orderID { get; set; }
        public int? productID { get; set; }
        public int? quantity { get; set; }
        public decimal? price { get; set; }
        public string? size { get; set; }

    }
}
