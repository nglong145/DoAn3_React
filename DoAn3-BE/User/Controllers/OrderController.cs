using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderBussiness _orderBussiness;
        public OrderController(IOrderBussiness orderBussiness)
        {
            _orderBussiness = orderBussiness;
        }

        [Route("create-order")]
        [HttpPost]
        public OrdersModel CreateItem([FromBody] OrdersModel order)
        {
            _orderBussiness.Create(order);
            return order;
        }
    }
}
