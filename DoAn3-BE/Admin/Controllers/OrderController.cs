using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderBussiness _orderBussiness;
        public OrderController(IOrderBussiness orderBussiness )
        {
            _orderBussiness = orderBussiness;

        }

        [Route("get-list")]
        [HttpPost]
        public IActionResult GetList([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                long total = 0;
                var data = _orderBussiness.GetList(page, pageSize, out total);
                return Ok(
                    new
                    {
                        TotalItems = total,
                        Data = data,
                        Page = page,
                        PageSize = pageSize
                    }
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("update-order")]
        [HttpPost]
        public IActionResult  UpdateOrder([FromBody] OrdersModel order)
        {
            try
            {
                
                _orderBussiness.Update(order);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [Route("getDetail/{orderid}")]
        [HttpGet]
        public OrdersModel GetDetail(int orderid)
        {
            return _orderBussiness.GetDetail(orderid);
        }

        [Route("delete-order/{orderid}")]
        [HttpDelete]
        public bool DeleteItem(int orderid)
        {
            return _orderBussiness.Delete(orderid);
        }

        [Route("Search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                DateTime? dFrom = null;
                DateTime? dTo = null;
                if (formData.Keys.Contains("dFrom") && !string.IsNullOrEmpty(Convert.ToString(formData["dFrom"])))
                {
                    if (DateTime.TryParse(Convert.ToString(formData["dFrom"]), out DateTime parsedDFrom))
                    {
                        dFrom = parsedDFrom;
                    }
                }

                if (formData.Keys.Contains("dTo") && !string.IsNullOrEmpty(Convert.ToString(formData["dTo"])))
                {
                    if (DateTime.TryParse(Convert.ToString(formData["dTo"]), out DateTime parsedDTo))
                    {
                        dTo = parsedDTo;
                    }
                }
                long total = 0;
                var data = _orderBussiness.Search(page, pageSize, out total,  dFrom, dTo);
                return Ok(
                    new
                    {
                        TotalItems = total,
                        Data = data,
                        Page = page,
                        PageSize = pageSize
                    }
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
