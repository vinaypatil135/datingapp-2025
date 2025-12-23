using System;
using API.Entities;

namespace API.interfaces;

public interface ITokenservice
{
  public string CreateToken(AppUser user);
}
