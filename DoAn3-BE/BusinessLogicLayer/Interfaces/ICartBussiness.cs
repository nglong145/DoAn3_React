using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface ICartBussiness
    {        
        public List<CartModel> GetAll(int accountid);

        public List<CartItemModel> GetItem(int accountid);

        bool Create(CartItemModel cart);

        bool Update(CartItemModel cart);
        bool Delete(int id);

    }
}
