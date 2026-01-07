using System;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<IReadOnlyList<Member>> GetMemberAsync()
    {
        return await context.Members.ToListAsync();
    }

    public async Task<Member?> GetMemberByIdAsync(string id)
    {
       return await context.Members.FindAsync(id);
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memeberId)
    {
       return await context.Members.Where(x =>x.Id==memeberId)
       .SelectMany(X =>X.Photos)
       .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync()>0;
    }

    public void Update(Member member)
    {
        context.Entry(member).State=EntityState.Modified;
    }
}
