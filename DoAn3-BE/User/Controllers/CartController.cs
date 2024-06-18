using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private ICartBussiness _cartBussiness;
        public CartController(ICartBussiness cartBussiness)
        {
            _cartBussiness = cartBussiness;
        }

        [Route("create-cart")]
        [HttpPost]
        public CartItemModel CreateItem([FromBody] CartItemModel cart)
        {
            _cartBussiness.Create(cart);
            return cart;
        }

        [Route("getList/{accountid}")]
        [HttpGet]
        public List<CartModel> GetList(int accountid)
        {
            return _cartBussiness.GetAll(accountid);
        }

        [Route("update-cart")]
        [HttpPut]
        public CartItemModel Update([FromBody] CartItemModel cart)
        {
            _cartBussiness.Update(cart);
            return cart;
        }

        [Route("delete-cart/{id}")]
        [HttpDelete]
        public bool DeleteItem(int id)
        {
            return _cartBussiness.Delete(id);
        }

        [Route("getItem/{accountid}")]
        [HttpGet]
        public List<CartItemModel> GetItem(int accountid)
        {
            return _cartBussiness.GetItem(accountid);
        }
    }
}
