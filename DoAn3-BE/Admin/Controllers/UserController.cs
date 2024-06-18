using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBussiness _userBussiness;
        public UserController(IUserBussiness userBussiness)
        {
            _userBussiness = userBussiness;
        }

        [AllowAnonymous]
        [Route("admin-login")]
        [HttpPost]
        public IActionResult AdminLogin([FromBody] AuthenticateModel model)
        {
            var user = _userBussiness.AdminAuthenticate(model.Username, model.Password);

            if (user == null)
                return Ok(new { message = "Tài khoản hoặc mật khẩu bị sai!" });
            return Ok(new { AccountID = user.accountID, UserName = user.username, Avatar = user.avatar, Type = user.type_name, token = user.token });
        }
    }
}
