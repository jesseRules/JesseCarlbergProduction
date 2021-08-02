using JesseCarlbergProduction.Extensions;
using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Services
{
    public class PhotoService: IPhotoService
    {
        public IAzureStorageConfig storageConfig;

        public PhotoService(IAzureStorageConfig config)
        {
            storageConfig = config;
        }

        public async Task<List<string>> GetThumbNailsAsync()
        {
            return await StorageHelper.GetThumbNailUrls(storageConfig);
        }

        public async Task<List<string>> GetImagesAsync()
        {
            List<string> thumbnailUrls = await StorageHelper.GetImagesUrls(storageConfig);
            return thumbnailUrls;
        }

        public async Task<List<string>> GetPhotoShootAsync(string photoShoot)
        {
            List<string> thumbnailUrls = await StorageHelper.GetPhotoSessionImagesUrls(storageConfig, photoShoot);
            return thumbnailUrls;
        }

        public async Task<IActionResult> Upload(ICollection<IFormFile> files, string imgLibrary)
        {
            foreach (var formFile in files)
            {
                if (StorageHelper.IsImage(formFile))
                {
                    if (formFile.Length > 0)
                    {
                        using (Stream stream = formFile.OpenReadStream())
                        {
                            await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        }
                    }
                }
                else
                {
                    return new UnsupportedMediaTypeResult();
                }
            }
            if (storageConfig.ImageContainer != string.Empty)
                return new AcceptedAtActionResult("GetImages", imgLibrary, null, null);
            else
                return new AcceptedResult();
        }

        public async Task<IActionResult> UploadToPhotoSession(ICollection<IFormFile> files, string photoSession)
        {
            foreach (var formFile in files)
            {
                if (StorageHelper.IsImage(formFile))
                {
                    if (formFile.Length > 0)
                    {
                        using (Stream stream = formFile.OpenReadStream())
                        {
                            await StorageHelper.UploadFileToPhotoStorage(stream, formFile.FileName, photoSession, storageConfig);
                        }
                    }
                }
                else
                {
                    return new UnsupportedMediaTypeResult();
                }
            }
            if (storageConfig.ThumbnailContainer != string.Empty)
                return new AcceptedAtActionResult("GetImages", photoSession, null, null);
            else
                return new AcceptedResult();
        }
    }
}