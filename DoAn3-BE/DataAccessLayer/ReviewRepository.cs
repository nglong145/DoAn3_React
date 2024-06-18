using DataAccessLayer.Interfaces;
using DataModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ReviewRepository:IReviewRepository
    {
        private IDatabaseHelper _dbHelper;
        public ReviewRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public List<ReviewModel> GetReview(int pageIndex, int pageSize, out long total, int proid)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_product_review_get_list",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@proid", proid);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["rc"];
                var reviews = dt.AsEnumerable()
                .GroupBy(row => new
                {
                    reviewID = row.Field<int>("reviewID"),
                    productID = row.Field<int>("productID"),
                    customerID = row.Field<int>("customerID"),
                    rating = row.Field<int?>("rating"),
                    review_text = row.Field<string?>("review_text"),
                    review_image = row.Field<string?>("review_image"),
                    created_date = row.Field<DateTime?>("created_date"),
                    status = row.Field<string?>("status")

                })
                .Select(g => new ReviewModel
                {
                    reviewID = g.Key.reviewID,
                    productID = g.Key.productID,
                    customerID = g.Key.customerID,
                    rating = g.Key.rating,
                    review_text = g.Key.review_text,
                    review_image = g.Key.review_image,
                    created_date = g.Key.created_date,
                    status = g.Key.status,
                    Users = g.Select(row => new UserModel
                    {
                        fullName = row.Field<string>("fullName"),
                        avatar = row.Field<string>("avatar")
                    }).ToList()
                })
                .ToList();

                return reviews;
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    
        public bool createReview(ReviewModel rv)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_review_create",
                "@accID", rv.customerID,
                "@proID", rv.productID,
                "@rate", rv.rating,
                "@text", rv.review_text,
                "@image", rv.review_image);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
