using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using DataModel;


namespace DataAccessLayer
{
    public class CategoryRepository:ICategoryRepository
    {
        private IDatabaseHelper _dbHelper;
        public CategoryRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }
        public List<CategoryModel> GetAll()
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_category_get_all");
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<CategoryModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<CategoryModel> GetList(int pageIndex, int pageSize, out long total)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_category_get_list_admin",
                    "@page_index", pageIndex,
                    "@page_size", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                return dt.ConvertTo<CategoryModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public CategoryModel GetById(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_category_getBy_id",
                     "@cateid", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<CategoryModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    

        public bool Create(CategoryModel cate)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_category_create",
                "@cateName", cate.category_name, 
                "@cateImage", cate.category_image,
                "@description",cate.description);
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

        public bool Update(CategoryModel cate)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_category_update",
                "@cateID", cate.categoryID,
                "@cateName", cate.category_name,
                "@cateImage", cate.category_image,
                "@description", cate.description);
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

        public bool Delete(int cateid)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_category_delete",
                "@cateID", cateid);
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

        public List<CategoryModel> Search(int pageIndex, int pageSize, out long total, string keyword)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_category_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@keyword", keyword);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                return dt.ConvertTo<CategoryModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
