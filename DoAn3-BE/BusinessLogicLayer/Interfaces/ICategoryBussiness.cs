using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataModel;

namespace BussinessLogicLayer
{
    public partial interface ICategoryBussiness
    {
        public List<CategoryModel> GetAll();
        public List<CategoryModel> GetList(int pageIndex, int pageSize, out long total);
        CategoryModel GetById(int id);
        bool Create(CategoryModel cate);
        bool Update(CategoryModel cate);
        bool Delete(int cateid);
        public List<CategoryModel> Search(int pageIndex, int pageSize, out long total, string keyword);
    }
}
