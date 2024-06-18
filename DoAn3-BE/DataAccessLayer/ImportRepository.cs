using DataModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial class ImportRepository : IImportRepository
    {
        private IDatabaseHelper _dbHelper;
        public ImportRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<ImportsModel> GetList(int pageIndex, int pageSize, out long total)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_imports_get_list_Admin",
                    "@pageIndex", pageIndex,
                    "@pageSize", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                return dt.ConvertTo<ImportsModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public ImportsModel GetDetail(int importid)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_import_get_detail_admin",
                     "@importid", importid);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                var import = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    import_orderID = row.Field<int>("import_orderID"),
                    suplierName = row.Field<string>("suplierName"),
                    address = row.Field<string?>("address"),
                    phoneNumber = row.Field<string?>("phoneNumber"),
                    created_date = row.Field<DateTime>("created_date"),
                    total_amount = row.Field<decimal>("total_amount")
                })
                .Select(g => new ImportsModel
                {
                    import_orderID = g.Key.import_orderID,
                    suplierName = g.Key.suplierName,
                    address = g.Key.address,
                    phoneNumber = g.Key.phoneNumber,
                    created_date = g.Key.created_date,
                    total_amount = g.Key.total_amount,
                    list_json_importitems = g.Select(row => new ImportItemModel
                    {
                        ioItemID = row.Field<int>("ioItemID"),
                        import_orderID = row.Field<int>("import_orderID"),
                        productID = row.Field<int>("productID"),
                        product_name = row.Field<string>("product_name"),
                        quantity = row.Field<int>("quantity"),
                        price = row.Field<decimal>("price"),
                        size = row.Field<string>("size")
                    }).ToList(),
                }).FirstOrDefault();


                return import;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Create(ImportsModel import)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_import_order_create_product_size",
                "@supplier", import.suplierName,
                "@address", import.address,
                "@phone", import.phoneNumber,
                "@total", import.total_amount,
                "@date", import.created_date,
                "@list_json_importitems", import.list_json_importitems != null ? MessageConvert.SerializeObject(import.list_json_importitems) : null);
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
    }
}
