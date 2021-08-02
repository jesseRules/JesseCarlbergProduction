using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Interfaces
{
    public interface IPhotoService
    {
        public Task<List<string>> GetThumbNailsAsync();
        public Task<List<string>> GetImagesAsync();
        public Task<List<string>> GetPhotoShootAsync(string photoShoot);
        public Task<IActionResult> Upload(ICollection<IFormFile> files, string imgLibrary);
        public Task<IActionResult> UploadToPhotoSession(ICollection<IFormFile> files, string photoSession);

    }
}