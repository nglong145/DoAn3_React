using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class CartBussiness:ICartBussiness
    {
        private ICartRepository _res;
        public CartBussiness(ICartRepository res)
        {
            _res = res;
        }
        public bool Create(CartItemModel cart)
        {
            return _res.Create(cart);
        }

        public List<CartModel> GetAll(int accountid)
        {
            return _res.GetAll( accountid);
        }

        public bool Update(CartItemModel cart)
        {
            return _res.Update(cart);
        }

        public List<CartItemModel> GetItem(int accountid)
        {
            return _res.GetItem(accountid);
        }

        public bool Delete(int id)
        {
            return _res.Delete(id);
        }
    }
}
