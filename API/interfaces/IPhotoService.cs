using System;
using CloudinaryDotNet.Actions;

namespace API.interfaces;

public interface IPhotoService
{
   Task<ImageUploadResult> UploadPhotoAsnyc(IFormFile file);
   Task<DeletionResult> DeletePhotoAsnyc(string publicId);
}
