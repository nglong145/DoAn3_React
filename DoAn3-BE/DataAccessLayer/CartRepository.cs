using DataModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class CartRepository:ICartRepository
    {
        private IDatabaseHelper _dbHelper;
        public CartRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(CartItemModel cart)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_cart_create_add_to_cart",
                "@accid", cart.accountID,
                "@prodid", cart.productID,
                "@sl", cart.quantity,
                "@size", cart.size);
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

        public List<CartModel> GetAll(int accountid)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_cart_get_info",
                    "@accid", accountid);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                var carts = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    cartID = row.Field<int>("cartID"),
                    customerID = row.Field<int?>("customerID"),
                    created_date = row.Field<DateTime?>("created_date"),
                })
                .Select(g => new CartModel
                {
                    cartID = g.Key.cartID,
                    customerID = g.Key.customerID,
                    created_date = g.Key.created_date,
                    cart_items = g.Select(row => new CartItemModel
                    {
                        cart_itemID = row.Field<int?>("cart_itemID"),
                        price = row.Field<decimal>("price"),
                        quantity = row.Field<int>("quantity"),
                        size = row.Field<string>("size")
                    }).ToList(),
                    products = g.Select(row => new ProductModel
                    {
                        productID = row.Field<int>("productID"),
                        product_name = row.Field<string>("product_name"),
                        images = row.Field<string>("images")
                    }).ToList(),
   
                })
                .ToList();

                return carts;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(CartItemModel cart)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_cart_update",
                "@cartid", cart.cartID,
                "@caritemid", cart.cart_itemID,
                "@size", cart.size,
                "@quantity", cart.quantity);
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
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_cart_delete",
                "@caritemid", id);
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

        public List<CartItemModel> GetItem(int accountid)   
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_cart_get_cartItem",
                    "@accid", accountid);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<CartItemModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
