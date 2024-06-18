using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAccessLayer
{
    public class UserRepository:IUserRepository
    {
        private IDatabaseHelper _dbHelper;
        public UserRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public UserModel GetUser(string username, string password)
        {
            string msgError = "";
            try
            {
                string hashedPassword = HashPassword(password);
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_account_getBy_username_password",
                     "@username", username,
                     "@password", hashedPassword);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<UserModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public UserModel AdminLogin(string username, string password)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_account_login_admin",
                     "@username", username,
                     "@password", password);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<UserModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public bool Register(UserRegisterModel user)
        {
            string msgError = "";
            try
            {
                string hashedPassword = HashPassword(user.password);

                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_register_account_customer",
                "@fullname", user.fullName,
                "@username", user.username,
                "@password", hashedPassword,
                "@email", user.email);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new ApplicationException ("tai khoan da ton tai!",ex);
            }
        }

        public UserModel GetInfo(int id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_account_getinfo_accountid",
                     "@id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<UserModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(UserModel user)
        {
            string msgError = "";
            try
            {
                //string hashedPassword = HashPassword(user.password);
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_account_update_info",
                "@id", user.accountID,
                "@name", user.fullName,
                "@image", user.avatar,
                //"@pass", hashedPassword,
                "@email", user.email, 
                "@phone", user.phoneNumber,
                "@address", user.Address);
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

        public bool ChangPass(UserModel user)
        {
            string msgError = "";
            try
            {
                string hashedPassword = HashPassword(user.password);
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_account_change_pass",
                "@id", user.accountID,
                "@pass", hashedPassword);
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
