using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required]
    [EmailAddress]
      public string email { get; set; }=null!;

[Required]
   public string displayName { get; set; }=null!;
   
   [Required]
   [MinLength(6)]
   public string password { get; set; }=null!;
}
