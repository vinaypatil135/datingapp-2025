using System;
using System.Security.Claims;

namespace API.Extension;

public static class claimsPricipalExtenstions
{
   public static string GetMemeberId (this ClaimsPrincipal user)
    {
         return user.FindFirstValue(ClaimTypes.NameIdentifier) 
         ?? throw new Exception("Cannot get memeberId from token");
    }
}
