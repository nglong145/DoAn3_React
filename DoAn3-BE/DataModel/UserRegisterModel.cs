using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class UserRegisterModel
    {
        public int accountID { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
