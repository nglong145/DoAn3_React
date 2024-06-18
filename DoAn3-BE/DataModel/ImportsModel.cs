using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class ImportsModel
    {
        public int? RowNumber {  get; set; }
        public int import_orderID {  get; set; }
        public string? suplierName {  get; set; }
        public string? address { get; set; }
        public string? phoneNumber { get; set; }
        public DateTime? created_date { get; set; }
        public decimal? total_amount { get; set; }
        public List<ImportItemModel>? list_json_importitems { get; set; }
    }
}
