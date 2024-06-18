using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class ProductModel
    {
        public int? RowNumber { get; set; }
        public int productID { get; set; }
        public string? product_name { get; set; }
        public int? brandID {  get; set; }
        public decimal? Price { get; set; }
        public string? description { get; set; }
        public string? status { get; set; }
        public int? categoryID { get; set; }
        public string? images {  get; set; }
        public List<CategoryModel>? Categories { get; set; }
        public List<BrandModel>? Brands { get; set; }
        public List<SizeModel>? Sizes { get; set; }
    }
}
