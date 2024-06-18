using BusinessLogicLayer;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class BlogBussiness: IBlogBussiness
    {
        private IBlogRepository _res;
        public BlogBussiness(IBlogRepository res)
        {
            _res = res;
        }

        public List<BlogModel> GetHome()
        {
            return _res.GetHome();
        }
    }
}
