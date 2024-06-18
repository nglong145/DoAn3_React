using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public partial interface IReviewRepository
    {
        public List<ReviewModel> GetReview(int pageIndex, int pageSize, out long total, int proid);
        bool createReview(ReviewModel rv);
    }
}
