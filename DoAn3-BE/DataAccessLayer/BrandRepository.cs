using DataAccessLayer.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class BrandRepository:IBrandRepository
    {
        private IDatabaseHelper _dbHelper;
        public BrandRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<BrandModel> getList()
        {
            string msgErrror = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgErrror, "sp_brands_getList");
                if (!string.IsNullOrEmpty(msgErrror))
                    throw new Exception(msgErrror);
                return dt.ConvertTo<BrandModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
