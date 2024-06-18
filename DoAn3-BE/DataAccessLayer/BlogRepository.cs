using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using DataModel;

namespace DataAccessLayer
{
    public class BlogRepository:IBlogRepository
    {
        private IDatabaseHelper _dbHelper;
        public BlogRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<BlogModel> GetHome()
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_blog_getHome");
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<BlogModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
