using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface IOrderBussiness
    {
        bool Create(OrdersModel order);

        public List<OrdersModel> GetList(int pageIndex, int pageSize, out long total);
        OrdersModel GetDetail(int id);
        bool Update(OrdersModel order);
        bool Delete(int id);
        public List<OrdersModel> Search(int pageIndex, int pageSize, out long total, DateTime? dateFrom, DateTime? dateTo);
    }
}
