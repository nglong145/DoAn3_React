using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class ProductBussiness:IProductBussiness
    {
        private IProductRepository _res;
        public ProductBussiness(IProductRepository res)
        {
            _res = res;
        }
        public List<ProductModel> GetFeatures()
        {
            return _res.GetFeatures();
        }

        public List<ProductModel> GetShopByCategory(int pageIndex, int pageSize, out long total, int cateID)
        {
            return _res.GetShopByCategory(pageIndex, pageSize, out total, cateID);
        }

        public ProductModel GetDetail( int proid)
        {
            return _res.GetDetail(proid);
        }

        public List<SizeModel>GetList(int proid) { 
            return _res.GetList(proid);
        }

        public List<ProductModel> GetSimilar(int proid)
        {
            return _res.GetSimilar(proid);
        }

        public List<ProductModel> GetList(int pageIndex, int pageSize, out long total)
        {
            return _res.GetList(pageIndex, pageSize, out total);
        }

        public bool Update(ProductModel product)
        {
            return _res.Update(product);
        }

        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string key)
        {
            return _res.Search(pageIndex, pageSize, out total, key);
        }
    }
}
