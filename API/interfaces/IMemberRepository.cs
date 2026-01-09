using System;
using API.Entities;

namespace API.interfaces;

public interface IMemberRepository
{
    void Update(Member member);

    Task<bool> SaveAllAsync();

    Task<IReadOnlyList<Member>> GetMemberAsync();

    Task<Member?> GetMemberByIdAsync(string Id);
    
    Task<Member?> GetMemberforUpdate(string memberID);

    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memeberId);
}
