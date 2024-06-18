using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public partial class UserModel
    {
        public int accountID { get; set; }
        public string? type_name{ get; set; }
        public string? fullName{ get; set; }
        public string? email{ get; set; }
        public string? Address{ get; set; }
        public string? phoneNumber{ get; set; }
        public string? username{ get; set; }
        public string? password{ get; set; }
        public string? avatar  { get; set; }
        public string? token {  get; set; }
    }
}
