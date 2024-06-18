using DataAccessLayer;
using DataModel;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLogicLayer
{
    public class UserBussiness:IUserBussiness
    {
        private IUserRepository _res;
        private string Secret;
        public UserBussiness(IUserRepository res, IConfiguration configuration)
        {
            Secret = configuration["AppSettings:Secret"];
            _res = res;
        }

        public UserModel Authenticate(string username, string password)
        {
            var user = _res.GetUser(username, password);
            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.fullName.ToString()),
                    new Claim(ClaimTypes.Email, user.email.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);

            return user;

        }

        public UserModel AdminAuthenticate(string username, string password)
        {
            var user = _res.AdminLogin(username, password);
            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.username.ToString()),
                    new Claim(ClaimTypes.Role, user.type_name.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);

            return user;

        }

        public bool Register(UserRegisterModel user)
        {
            return _res.Register(user);
        }

        public UserModel GetInfo(int id)
        {
            return _res.GetInfo(id);
        }

        public bool Update(UserModel user)
        {
            return _res.Update(user);
        }

        public bool ChangePass(UserModel user)
        {
            return _res.ChangPass(user);
        }
    }
}
