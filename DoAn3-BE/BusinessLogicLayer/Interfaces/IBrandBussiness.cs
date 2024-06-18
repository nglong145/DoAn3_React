using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer.Interfaces
{
    public partial interface IBrandBussiness
    {
        public List<BrandModel> getList();
    }
}
