using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserBussiness _userBussiness;
        private string _path;
        public UserController(IUserBussiness userBussiness, IConfiguration configuration)
        {
            _userBussiness = userBussiness;
            _path = configuration["AppSettings:PATH"];
        }


        [NonAction]
        //phương thức này không phải là một hành động(action method) và sẽ không được gọi trực tiếp từ các yêu cầu HTTP
        public string SaveFileFromBase64String(string RelativePathFileName, string dataFromBase64String)
        {
            if (dataFromBase64String.Contains("base64,"))
            {
                dataFromBase64String = dataFromBase64String.Substring(dataFromBase64String.IndexOf("base64,", 0) + 7);
            }
            return WriteFileToAuthAccessFolder(RelativePathFileName, dataFromBase64String);
        }

        [NonAction]
        public string WriteFileToAuthAccessFolder(string RelativePathFileName, string base64StringData)
        {
            try
            {
                string result = "";
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = System.IO.Path.GetDirectoryName(fullPathFile);
                if (!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                System.IO.File.WriteAllBytes(fullPathFile, Convert.FromBase64String(base64StringData));
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {   
                if (file.Length > 0)
                {
                    string filePath = $"{file.FileName}";
                    var fullPath = CreatePathFile(filePath);
                    using (var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    return Ok(new { filePath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Không tìm thây");
            }
        }

        [NonAction]
        private string CreatePathFile(string RelativePathFileName)
        {
            try
            {
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = System.IO.Path.GetDirectoryName(fullPathFile);
                if (!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                return fullPathFile;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var user = _userBussiness.Authenticate(model.Username, model.Password);

            if (user == null)
                return Ok(new { message = "Tài khoản hoặc mật khẩu bị sai!" });
            return Ok(new { AccountID = user.accountID, Name = user.fullName, UserName = user.username, token = user.token ,Avatar=user.avatar});
        }

        [Route("register")]
        [HttpPost]
        public UserRegisterModel Register([FromBody] UserRegisterModel user)
        {
            _userBussiness.Register(user);
            return user;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public UserModel GetInfo( int id)
        {
            
            return _userBussiness.GetInfo(id); ;
        }

        [Route("update-user")]
        [HttpPut]
        public UserModel Update([FromBody] UserModel user)
        {
            if (user.avatar != null)
            {
                var arrData = user.avatar.Split(';');
                if (arrData.Length == 3)
                {
                    var savePath = $@"/assets/images/avatar{arrData[0]}";
                    user.avatar = $"{savePath}";
                    SaveFileFromBase64String(savePath, arrData[2]);
                }
            }
            _userBussiness.Update(user);
            return user;
        }

        [Route("change-password")]
        [HttpPut]
        public UserModel ChangePass([FromBody] UserModel user)
        {
            _userBussiness.ChangePass(user);
            return user;
        }
    }
}
