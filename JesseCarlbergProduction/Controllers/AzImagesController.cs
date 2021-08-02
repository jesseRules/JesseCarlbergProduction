using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Controllers
{
    [Route("api/[controller]")]
    public class AzImagesController : ControllerBase
    {
        private readonly IPhotoService _azPhotoService;

        public AzImagesController(PhotoService azPhotoService)
        {
            _azPhotoService = azPhotoService;
        }

        // POST /api/images/upload
        [Authorize(Roles = "Admin")]
        [HttpPost("[action]/{photoSession}")]
        public async Task<IActionResult> UploadAsync(ICollection<IFormFile> files, string photoSession)
        {
            return await _azPhotoService.Upload(files, photoSession);
        }

        // POST /api/images/upload
        [Authorize(Roles = "Admin")]
        [HttpPost("UploadToPhotoSesssion")]
        public async Task<IActionResult> UploadToPhotoSesssionAsync(ICollection<IFormFile> files, string photoSession)
        {
            return await _azPhotoService.UploadToPhotoSession(files, photoSession);
        }

        // GET /api/images/thumbnails
        [HttpGet("thumbnails")]
        public async Task<List<string>> GetThumbNailsAsync()
        {
            return await _azPhotoService.GetThumbNailsAsync();
        }

        // GET /api/images/images
        [Authorize]
        [HttpGet("images")]
        public async Task<List<string>> GetImagesAsync()
        {
            return await _azPhotoService.GetImagesAsync();
        }

        // GET /api/images/photos/session
        [HttpGet("photos/{session}")]
        public async Task<List<string>> GetImagesFromShootAsync(string session)
        {
            return await _azPhotoService.GetImagesAsync();
        }
    }
}