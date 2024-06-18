using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial interface IProductRepository
    {
        public List<ProductModel> GetFeatures();
        public List<ProductModel> GetShopByCategory(int pageIndex, int pageSize, out long total, int cateID);
        ProductModel GetDetail(int prodid);
        public List<SizeModel> GetList(int prodid);
        public List<ProductModel> GetSimilar(int prodid);


        public List<ProductModel> GetList(int pageIndex, int pageSize, out long total);
        bool Update(ProductModel product);


        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string key);
    }
}
