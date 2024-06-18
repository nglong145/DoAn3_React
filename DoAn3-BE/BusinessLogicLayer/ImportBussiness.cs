using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial class ImportBussiness: IImportBussiness
    {
        private IImportRepository _res;
        public ImportBussiness(IImportRepository res)
        {
            _res = res;
        }

        public List<ImportsModel> GetList(int pageIndex, int pageSize, out long total)
        {
            return _res.GetList(pageIndex, pageSize, out total);
        }

        public ImportsModel GetDetail(int importid)
        {
            return _res.GetDetail(importid);
        }


        public bool Create(ImportsModel import)
        {
            return _res.Create(import);
        }


    }
}
