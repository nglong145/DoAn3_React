using BussinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : ControllerBase
    {
        private IImportBussiness _importBussiness;
        public ImportController(IImportBussiness importBussiness)
        {
            _importBussiness = importBussiness;
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
                var data = _importBussiness.GetList(page, pageSize, out total);
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


        [Route("getDetail/{importid}")]
        [HttpGet]
        public ImportsModel GetDetail(int importid)
        {
            return _importBussiness.GetDetail(importid);
        }

        [Route("create-import")]
        [HttpPost]
        public ImportsModel CreateItem([FromBody] ImportsModel import)
        {
            _importBussiness.Create(import);
            return import;
        }
    }
}
