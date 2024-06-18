using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class BlogModel
    {
        public int blogID { get; set; }
        public string title { get; set; }
        public string image_blog { get; set; }
        public string description { get; set; }
        public string details { get; set; }
        public DateTime created_date { get; set; }
    }
}
