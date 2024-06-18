using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface IProductBussiness
    {
        public List<ProductModel> GetFeatures();
        public List<ProductModel> GetShopByCategory(int pageIndex, int pageSize, out long total, int cateID);
        ProductModel GetDetail(int proid);

        public List<SizeModel>GetList(int proid);

        public List<ProductModel> GetSimilar(int proid);

        public List<ProductModel> GetList(int pageIndex, int pageSize, out long total);

        bool Update(ProductModel product);

        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string key);
    }
}
