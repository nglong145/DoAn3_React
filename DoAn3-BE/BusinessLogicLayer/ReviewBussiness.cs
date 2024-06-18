using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class ReviewBussiness:IReviewBussiness
    {
        private IReviewRepository _res;
        public ReviewBussiness(IReviewRepository res)
        {
            _res = res;
        }

        public List<ReviewModel> GetReview(int pageIndex, int pageSize, out long total, int proid)
        {
            return _res.GetReview(pageIndex, pageSize, out total, proid);
        }

        public bool createReview(ReviewModel rv)
        {
            return _res.createReview(rv);
        }
    }
}
