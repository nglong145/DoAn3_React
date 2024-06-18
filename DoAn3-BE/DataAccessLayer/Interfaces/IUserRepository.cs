using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial interface IUserRepository
    {
        UserModel GetUser(string username, string password);
        UserModel AdminLogin(string username, string password);
        UserModel GetInfo(int id);

        bool Register(UserRegisterModel user);
        bool Update(UserModel user);
        bool ChangPass(UserModel user);
    }
}
