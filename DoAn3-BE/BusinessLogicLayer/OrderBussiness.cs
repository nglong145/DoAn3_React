using BussinessLogicLayer;
using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial class OrderBussiness:IOrderBussiness
    {
        private IOrderRepository _res;
        public OrderBussiness(IOrderRepository res)
        {
            _res = res;
        }
        //user
        public bool Create (OrdersModel order)
        {
            return _res.Create (order);
        }

        //admin
        public List<OrdersModel> GetList(int pageIndex, int pageSize, out long total)
        {
            return _res.GetList (pageIndex, pageSize, out total);
        }
        public OrdersModel GetDetail(int id)
        {
            return _res.GetDetail (id);
        }
        public bool Update(OrdersModel order)
        {
            return _res.Update (order);
        }
        public bool Delete(int id)
        {
            return _res.Delete (id);
        }
        public List<OrdersModel> Search(int pageIndex, int pageSize, out long total, DateTime? dateFrom, DateTime? dateTo)
        {
            return _res.Search(pageIndex,pageSize, out total, dateFrom, dateTo);
        }
    }
}
