using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class CategoryModel
    {
        public int? RowNumber { get; set; }
        public int categoryID { get; set; }
        public string? category_name { get; set; }
        public string? category_image { get; set; }
        public string? description { get; set; }
    }
}
