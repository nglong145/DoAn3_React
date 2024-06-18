using DataAccessLayer;
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
    public partial class OrderRepository:IOrderRepository
    {
        private IDatabaseHelper _dbHelper;
        public OrderRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // User
        public bool Create(OrdersModel order)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_order_create",
                "@accid", order.customerID,
                "@name", order.fullName,
                "@phone", order.phone,
                "@address", order.delivery_address,
                "@total", order.total_amount,
                "@list_json_orderitems", order.list_json_orderitems != null ? MessageConvert.SerializeObject(order.list_json_orderitems) : null,
                "@description", order.orderStatus != null && order.orderStatus.Any() ? order.orderStatus[0].description : null,
                "@payment", order.payments != null && order.payments.Any() ? order.payments[0].paymentMethod : null);
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



        //admin
        public List<OrdersModel> GetList(int pageIndex, int pageSize, out long total)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_orders_get_list_Admin",
                    "@pageIndex", pageIndex,
                    "@pageSize", pageSize);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                var orders = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    RowNumber = row.Field<long>("RowNumber"),
                    orderID = row.Field<int>("orderID"),
                    customerID = row.Field<int?>("customerID"),
                    fullName = row.Field<string?>("fullName"),
                    phone = row.Field<string?>("phone"),
                    created_date = row.Field<DateTime?>("created_date"),
                    total_amount = row.Field<decimal?>("total_amount"),
                    delivery_address = row.Field<string?>("delivery_address"),
                })
                .Select(g => new OrdersModel
                {
                    RowNumber = g.Key.RowNumber,
                    orderID = g.Key.orderID,
                    customerID = g.Key.customerID,
                    fullName = g.Key.fullName,
                    phone = g.Key.phone,
                    created_date = g.Key.created_date,
                    total_amount = g.Key.total_amount,
                    delivery_address = g.Key.delivery_address,
                    orderStatus = g.Select(row => new OrderStatusModel
                    {
                        
                        status_name = row.Field<string>("status_name")
                    }).ToList(),
                    payments = g.Select(row => new PaymentModel
                    {
                     
                        paymentMethod = row.Field<string>("paymentMethod")
                    }).ToList(),
                })
                .ToList();

                return orders;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public OrdersModel GetDetail(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_orders_get_detail_admin",
                     "@orderid", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                var order = dt.AsEnumerable()
                .GroupBy(row => new
                {

                    orderID = row.Field<int>("orderID"),
                    customerID = row.Field<int?>("customerID"),
                    fullName = row.Field<string?>("fullName"),
                    phone = row.Field<string?>("phone"),
                    created_date = row.Field<DateTime?>("created_date"),
                    total_amount = row.Field<decimal?>("total_amount"),
                    delivery_address = row.Field<string?>("delivery_address"),
                })
                .Select(g => new OrdersModel
                {

                    orderID = g.Key.orderID,
                    customerID = g.Key.customerID,
                    fullName = g.Key.fullName,
                    phone = g.Key.phone,
                    created_date = g.Key.created_date,
                    total_amount = g.Key.total_amount,
                    delivery_address = g.Key.delivery_address,
                    orderStatus = g.Select(row => new OrderStatusModel
                    {

                        status_name = row.Field<string>("status_name"),
                        description = row.Field<string>("description")
                    }).ToList(),
                    payments = g.Select(row => new PaymentModel
                    {

                        paymentMethod = row.Field<string>("paymentMethod"),
                        status = row.Field<string>("status"),
                    }).ToList(),
                    list_json_orderitems = g.Select(row => new OrderItemModel
                    {
                        order_itemID = row.Field<int>("order_itemID"),
                        orderID = row.Field<int>("orderID"),
                        productID = row.Field<int>("productID"),
                        quantity = row.Field<int>("quantity"),
                        price = row.Field<decimal>("price"),
                        size = row.Field<string>("size")
                    }).ToList(),

                    products = g.Select(row => new ProductModel
                    {
                        productID = row.Field<int>("productID"),
                        product_name = row.Field<string>("product_name"),
                        images = row.Field<string>("images")
                    }).ToList()

                    
                })
                .FirstOrDefault();

                return order;
                //return dt.ConvertTo<ProductModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Update(OrdersModel order)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_orders_update_admin",
                "@orderid", order.orderID,
                "@ordStatus", order.orderStatus[0].status_name,
                "@payStatus", order.payments[0].status);
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

        public bool Delete(int id)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_order_delete_admin",
                "@orderid", id);
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

        public List<OrdersModel> Search(int pageIndex, int pageSize, out long total, DateTime? dFrom, DateTime? dTo)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_orders_search_admin",
                    "@pageIndex", pageIndex,
                    "@pageSize", pageSize,
                    "@dateFrom", dFrom,
                    "@dateTo", dTo);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                var orders = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    orderID = row.Field<int>("orderID"),
                    customerID = row.Field<int?>("customerID"),
                    fullName = row.Field<string?>("fullName"),
                    phone = row.Field<string?>("phone"),
                    created_date = row.Field<DateTime?>("created_date"),
                    total_amount = row.Field<decimal?>("total_amount"),
                    delivery_address = row.Field<string?>("delivery_address"),
                })
                .Select(g => new OrdersModel
                {
                    orderID = g.Key.orderID,
                    customerID = g.Key.customerID,
                    fullName = g.Key.fullName,
                    phone = g.Key.phone,
                    created_date = g.Key.created_date,
                    total_amount = g.Key.total_amount,
                    delivery_address = g.Key.delivery_address,
                    orderStatus = g.Select(row => new OrderStatusModel
                    {
                      
                        status_name = row.Field<string>("status_name")
                    }).ToList(),
                    payments = g.Select(row => new PaymentModel
                    {
                       
                        paymentMethod = row.Field<string>("paymentMethod")
                    }).ToList(),
                })
                .ToList();

                return orders;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
