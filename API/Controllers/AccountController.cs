using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extension;
using API.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenservice tokenservice):BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDTO registerdto)
    {
        if(await EmailExists(registerdto.email)) return BadRequest("Email taken");
        var hmac=new HMACSHA512();
        var users=new AppUser
        {
            DisplayName=registerdto.displayName,
            Email=registerdto.email,
            PasswordHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.password)),
            PasswordSalt=hmac.Key
        };
        context.Users.Add(users);
        await context.SaveChangesAsync();
        return users.ToDto(tokenservice);
        
    }

    [HttpPost("login")]
     public async Task<ActionResult<UserDto>> Login(LoginDTO logindto)
    {
        var user=await context.Users.SingleOrDefaultAsync(x=>x.Email==logindto.email);
        if (user==null) return Unauthorized("Inavild Email Address");
        var hmac=new HMACSHA512(user.PasswordSalt);
        var ComputeHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.password));
        for (int i = 0; i < ComputeHash.Length; i++)
        {
            if(ComputeHash[i]!=user.PasswordHash[i]) return Unauthorized("Invalid password");

        }
        return user.ToDto(tokenservice);
    }
    public async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(x=> x.Email.ToLower()==email.ToLower());
    }
    
}
