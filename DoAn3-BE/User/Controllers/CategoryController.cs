using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryBussiness _categoryBussiness;
        public CategoryController(ICategoryBussiness categoryBussiness)
        {
            _categoryBussiness = categoryBussiness;
        }

        [Route("get-list")]
        [HttpGet]
        public List<CategoryModel> GetList()
        {
            return _categoryBussiness.GetAll();
        }
    }
}
