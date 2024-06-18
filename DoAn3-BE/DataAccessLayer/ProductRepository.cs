using DataModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ProductRepository:IProductRepository
    {
        private IDatabaseHelper _dbHelper;
        public ProductRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<ProductModel> GetFeatures()
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_product_get_features");
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<ProductModel> GetShopByCategory(int pageIndex, int pageSize, out long total, int cateID)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_product_get_shop_by_category",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@cate", cateID);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                //var products = dt.AsEnumerable()
                //.GroupBy(row => new
                //{
                //    productID = row.Field<int>("productID"),
                //    product_name = row.Field<string>("product_name"),
                //    brandID = row.Field<int?>("brandID"),
                //    Price = row.Field<decimal?>("Price"),
                //    description = row.Field<string>("description"),
                //    status = row.Field<string>("status"),
                //    categoryID = row.Field<int?>("categoryID")
                //})
                //.Select(g => new ProductModel
                //{
                //productID = g.Key.productID,
                //product_name = g.Key.product_name,
                //brandID = g.Key.brandID,
                //Price = g.Key.Price,
                //description = g.Key.description,
                //status = g.Key.status,
                //categoryID = g.Key.categoryID,
                //ProductImages = g.Select(row => new ProductImageModel
                //{
                //    productID = row.Field<int>("productID"),
                //    imageMain = row.Field<string>("imageMain")
                //}).FirstOrDefault()
                //})
                //.ToList();

                //return products;
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ProductModel GetDetail(int prodid)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_product_get_detail",
                     "@proid", prodid);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                var products = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    productID = row.Field<int>("productID"),
                    product_name = row.Field<string>("product_name"),
                    brandID = row.Field<int?>("brandID"),
                    Price = row.Field<decimal?>("Price"),
                    description = row.Field<string>("description"),
                    status = row.Field<string>("status"),
                    categoryID = row.Field<int?>("categoryID"),
                    images = row.Field<string?>("images")
                })
                .Select(g => new ProductModel
                {
                    productID = g.Key.productID,
                    product_name = g.Key.product_name,
                    brandID = g.Key.brandID,
                    Price = g.Key.Price,
                    description = g.Key.description,
                    status = g.Key.status,
                    categoryID = g.Key.categoryID,
                    images = g.Key.images,
                    Categories = g.Select(row => new CategoryModel
                    {
                        categoryID = row.Field<int>("categoryID"),
                        category_name = row.Field<string>("category_name")
                    }).ToList(),
                    Brands = g.Select(row => new BrandModel
                    {
                        brandID = row.Field<int>("brandID"),
                        brand_name = row.Field<string>("brand_name")
                    }).ToList(),
                })
                .FirstOrDefault();

                return products;
                //return dt.ConvertTo<ProductModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SizeModel>GetList(int proid)
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_product_get_sizes",
                    "@proid",proid);
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<SizeModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ProductModel> GetSimilar(int proid)
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_product_get_similar",
                    "@proid", proid);
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //admin
        public List<ProductModel> GetList(int pageIndex, int pageSize, out long total)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_product_getList_Admin",
                    "@page_index", pageIndex,
                    "@page_size", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(ProductModel product)
        {
            string msgError = "";
            try
            {

                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_product_update_admin",
                "@proid", product.productID,
                "@proName", product.product_name,
                "@brandid", product.brandID,
                "@cateid", product.categoryID,
                "@price", product.Price,
                "@description", product.description,
                "@status", product.status,
                "@img", product.images);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string key)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_product_search_admin",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@keyword", key);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                //var products = dt.AsEnumerable()
                //.GroupBy(row => new
                //{
                //    productID = row.Field<int>("productID"),
                //    product_name = row.Field<string>("product_name"),
                //    brandID = row.Field<int?>("brandID"),
                //    Price = row.Field<decimal?>("Price"),
                //    description = row.Field<string>("description"),
                //    status = row.Field<string>("status"),
                //    categoryID = row.Field<int?>("categoryID")
                //})
                //.Select(g => new ProductModel
                //{
                //productID = g.Key.productID,
                //product_name = g.Key.product_name,
                //brandID = g.Key.brandID,
                //Price = g.Key.Price,
                //description = g.Key.description,
                //status = g.Key.status,
                //categoryID = g.Key.categoryID,
                //ProductImages = g.Select(row => new ProductImageModel
                //{
                //    productID = row.Field<int>("productID"),
                //    imageMain = row.Field<string>("imageMain")
                //}).FirstOrDefault()
                //})
                //.ToList();

                //return products;
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
