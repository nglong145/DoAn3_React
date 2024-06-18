using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial interface IOrderRepository
    {
        public List<OrdersModel> GetList(int pageIndex, int pageSize, out long total);
        OrdersModel GetDetail(int id);
        bool Create(OrdersModel order);
        bool Update(OrdersModel order);
        bool Delete(int id);
        public List<OrdersModel> Search(int pageIndex, int pageSize, out long total,  DateTime? dateFrom,DateTime? dateTo);
    }
}
