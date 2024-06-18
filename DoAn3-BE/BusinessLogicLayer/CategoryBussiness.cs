using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer;
using DataModel;

namespace BussinessLogicLayer
{
    public class CategoryBussiness : ICategoryBussiness
    {
        private ICategoryRepository _res;
        public CategoryBussiness(ICategoryRepository res)
        {
            _res = res;
        }

        public List<CategoryModel> GetAll()
        {
            return _res.GetAll();
        }

        public List<CategoryModel> GetList(int pageIndex, int pageSize, out long total)
        {
            return _res.GetList(pageIndex, pageSize, out total);
        }

        public CategoryModel GetById(int id) {
            return _res.GetById(id);
        }
        public bool Create(CategoryModel cate)
        {
            return _res.Create(cate);
        }

        public bool Update(CategoryModel cate)
        {
            return _res.Update(cate);
        }

        public bool Delete(int cateid)
        {
            return _res.Delete(cateid);
        }

        public List<CategoryModel> Search(int pageIndex, int pageSize, out long total, string keyword)
        {
            return _res.Search(pageIndex, pageSize, out total, keyword);
        }
    }
}
