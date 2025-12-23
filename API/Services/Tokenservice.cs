using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class Tokenservice(IConfiguration config): ITokenservice
{
    public string CreateToken(AppUser user)
    {
        var tokenkey=config["TokenKey"] ?? throw new Exception("cannot get Token key");
        if (tokenkey.Length<64)
        {
            throw new Exception("yout token key to be >=64 characters");
        }
         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenkey));

            var claims=new List<Claim>
            {
                new(ClaimTypes.Email,user.Email),
                new(ClaimTypes.NameIdentifier,user.Id),

            };
            var creds=new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription=new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(claims),
                Expires=DateTime.UtcNow.AddDays(7),
                SigningCredentials=creds
            };
            var tokenhandler=new JwtSecurityTokenHandler();
            var token=tokenhandler.CreateToken(tokenDescription);
            return tokenhandler.WriteToken(token);
    }
}
