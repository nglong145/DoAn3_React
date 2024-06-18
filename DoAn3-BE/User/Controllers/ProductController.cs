using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductBussiness _productBussiness;
        public ProductController(IProductBussiness productBussiness)
        {
            _productBussiness = productBussiness;
        }

        [Route("getFeatures")]
        [HttpGet]
        public List<ProductModel> GetFeatures()
        {
            return _productBussiness.GetFeatures();
        }

        [Route("getShopByCategory")]
        [HttpPost]
        public IActionResult GetShopByCategory([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                var cateID = int.Parse(formData["cate"].ToString()); ;
                //if (formData.Keys.Contains("cate") && !string.IsNullOrEmpty(Convert.ToString(formData["cate"]))) { cateID = int.Parse(formData["cate"]); }

                long total = 0;
                var data = _productBussiness.GetShopByCategory(page, pageSize, out total, cateID);
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

        [Route("getDetail/{proid}")]
        [HttpGet]
        public ProductModel GetDetail( int proid)
        {
            return _productBussiness.GetDetail(proid);
        }

        [Route("getSize/{proid}")]
        [HttpGet]
        public List<SizeModel> GetList(int proid)
        {
            return _productBussiness.GetList(proid);
        }

        [Route("getSimilar/{proid}")]
        [HttpGet]
        public List<ProductModel> GetSimilar(int proid)
        {
            return _productBussiness.GetSimilar(proid);
        }
    }
}
