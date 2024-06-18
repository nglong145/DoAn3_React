using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductBussiness _productBussiness;
        private string _path;
        public ProductController(IProductBussiness productBussiness,IConfiguration configuration)
        {
            _productBussiness = productBussiness;
            _path = configuration["AppSettings:PATH_product"];

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




        [Route("get-list")]
        [HttpPost]
        public IActionResult GetList([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                long total = 0;
                var data = _productBussiness.GetList(page, pageSize, out total);
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

        
        [Route("update-product")]
        [HttpPost]
        public IActionResult UpdateProduct([FromBody] ProductModel product)
        {
            try
            {
                if (product.images != null)
                {
                    var arrData = product.images.Split(';');
                    if (arrData.Length == 3)
                    {
                        var savePath = $@"/assets/images/products{arrData[0]}";
                        product.images = $"{savePath}";
                        SaveFileFromBase64String(savePath, arrData[2]);
                    }
                }
                _productBussiness.Update(product);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [Route("getDetail/{proid}")]
        [HttpGet]
        public ProductModel GetDetail(int proid)
        {
            return _productBussiness.GetDetail(proid);
        }

        [Route("Search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string keyword = "";
                if (formData.Keys.Contains("keyword") && !string.IsNullOrEmpty(Convert.ToString(formData["keyword"]))) { keyword = Convert.ToString(formData["keyword"]); }

                long total = 0;
                var data = _productBussiness.Search(page, pageSize, out total,keyword);
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
