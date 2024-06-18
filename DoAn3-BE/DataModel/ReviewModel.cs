using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class ReviewModel
    {
        public int reviewID { get; set; }
        public int productID { get; set; }
        public int customerID { get; set; }
        public int? rating { get; set; }
        public string? review_text { get; set; }
        public string? review_image { get; set; }
        public DateTime? created_date { get; set; }
        public string? status { get; set; }
        public List<UserModel>? Users { get; set; }

    }
}
