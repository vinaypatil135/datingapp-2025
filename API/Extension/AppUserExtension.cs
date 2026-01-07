using System;
using API.DTOs;
using API.Entities;
using API.interfaces;

namespace API.Extension;

public static class AppUserExtension
{
 public static UserDto ToDto(this AppUser user,ITokenservice tokenservice)
    {
       return  new UserDto
        {
            Id=user.Id,
            DisplayName=user.DisplayName,
            Email=user.Email,
            ImageUrl=user.ImagUrl,
            Token=tokenservice.CreateToken(user)
        };
    }
}
