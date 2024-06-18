using BussinessLogicLayer.Interfaces;
using DataAccessLayer.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class BrandBussiness:IBrandBussiness
    {
        private IBrandRepository _res;
        public BrandBussiness(IBrandRepository res)
        {
            _res = res;
        }

        public List<BrandModel> getList()
        {
            return _res.getList();
        }

    }
}
