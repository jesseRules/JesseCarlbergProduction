using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace JesseCarlbergProduction.Controllers
{
    /// <summary>
    /// Class AntiForgeryController.
    /// Implements the <see cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    [Route("api/[controller]")]
    [ApiController]
    public class AntiForgeryController : ControllerBase
    {
        /// <summary>
        /// The anti forgery
        /// </summary>
        private readonly IAntiforgery _antiForgery;

        /*
            Anti-Forgery Controller
            Contains all methods API calls for Anti_forgery Token
        */

        /// <summary>
        /// Initializes a new instance of the <see cref="AntiForgeryController"/> class.
        /// </summary>
        /// <param name="antiForgery">The anti forgery.</param>
        public AntiForgeryController(IAntiforgery antiForgery)
        {
            _antiForgery = antiForgery;
        }

        /// <summary>
        /// Generates Anti-Forgery token to be used in Angular App Logins
        /// </summary>
        /// <returns>Anti-ForgeryToken</returns>
        /// <remarks>Anti_forgery tokens are passed with the form submits, this adds an additional layer of security to prevent phishing attacks.</remarks>
        [HttpGet]
        [Route("antiforgery")]
        [IgnoreAntiforgeryToken]
        public IActionResult GenerateAntiForgeryTokens()
        {
            var tokens = _antiForgery.GetAndStoreTokens(HttpContext);
            Response.Cookies.Append("X-XSRF-TOKEN", tokens.RequestToken, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = false
            });
            return NoContent();
        }
    }
}