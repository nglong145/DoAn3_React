using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial interface ICartRepository
    {
        List<CartModel> GetAll(int accountid);
        bool Create(CartItemModel cart);

        bool Update(CartItemModel cart);

        bool Delete(int id);

        List<CartItemModel> GetItem(int accountid);
    }
}
