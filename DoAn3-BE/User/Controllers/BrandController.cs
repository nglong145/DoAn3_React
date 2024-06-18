using BusinessLogicLayer.Interfaces;
using BussinessLogicLayer.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private IBrandBussiness _brandBussiness;
        public BrandController(IBrandBussiness brandBussiness)
        {
            _brandBussiness = brandBussiness;
        }

        [Route("get-list")]
        [HttpGet]
        public List<BrandModel> getList()
        {
            return _brandBussiness.getList();
        }
    }
}
