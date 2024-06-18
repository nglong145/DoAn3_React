using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface IImportBussiness
    {
        bool Create(ImportsModel import);
        public List<ImportsModel> GetList(int pageIndex, int pageSize, out long total);
        ImportsModel GetDetail(int importid);

    }
}
