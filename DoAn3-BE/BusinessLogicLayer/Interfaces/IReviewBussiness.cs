using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface IReviewBussiness
    {
        public List<ReviewModel> GetReview(int pageIndex, int pageSize, out long total, int proid);
        bool createReview(ReviewModel rv);
    }
}
