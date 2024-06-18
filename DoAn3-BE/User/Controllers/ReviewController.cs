using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private IReviewBussiness _reviewBussiness;
        private string _path;
        public ReviewController(IReviewBussiness reviewBussiness, IConfiguration configuration)
        {
            _reviewBussiness = reviewBussiness;
            _path = configuration["AppSettings:PATH_review"];
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








        [Route("getReview")]
        [HttpPost]
        public IActionResult GetReview([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                var proid = int.Parse(formData["proid"].ToString()); ;
                //if (formData.Keys.Contains("cate") && !string.IsNullOrEmpty(Convert.ToString(formData["cate"]))) { cateID = int.Parse(formData["cate"]); }

                long total = 0;
                var data = _reviewBussiness.GetReview(page, pageSize, out total, proid);
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


        [Route("create-review")]
        [HttpPost]
        public ReviewModel Update([FromBody] ReviewModel rv)
        {
            if (rv.review_image != null)
            {
                var arrData = rv.review_image.Split(';');
                if (arrData.Length == 3)
                {
                    var savePath = $@"/assets/images/reviews{arrData[0]}";
                    rv.review_image = $"{savePath}";
                    SaveFileFromBase64String(savePath, arrData[2]);
                }
            }
            _reviewBussiness.createReview(rv);
            return rv;
        }
    }
}
