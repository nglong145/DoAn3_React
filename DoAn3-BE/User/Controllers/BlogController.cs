using BusinessLogicLayer.Interfaces;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private IBlogBussiness _blogBussiness;
        public BlogController(IBlogBussiness blogBussiness)
        {
            _blogBussiness = blogBussiness;
        }

        [Route("get-home")]
        [HttpGet]
        public List<BlogModel> GetHome()
        {
            return _blogBussiness.GetHome();
        }
    }
}
