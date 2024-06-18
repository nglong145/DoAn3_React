using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public partial interface IUserBussiness
    {
        UserModel Authenticate(string username, string password);
        UserModel AdminAuthenticate(string username, string password);
        bool Register(UserRegisterModel user);
        UserModel GetInfo(int id);
        bool Update(UserModel user);
        bool ChangePass(UserModel user);
    }
}
