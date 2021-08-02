using JesseCarlbergProduction.Interfaces;
using JesseCarlbergProduction.Models;
using JesseCarlbergProduction.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JesseCarlbergProduction.Controllers
{
    /// <summary>
    /// Class AuthController.
    /// Implements the <see cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.ControllerBase" />
    /// <seealso cref="Microsoft.AspNetCore.Identity" />
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase, IDisposable
    {
        /// <summary>
        /// The ASP.Net Core Auth user manager
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// The role manager
        /// </summary>
        private readonly RoleManager<IdentityRole> _roleManager;

        /// <summary>
        /// The sign in manager
        /// </summary>
        private readonly SignInManager<ApplicationUser> _signInManager;

        /// <summary>
        /// The configuration
        /// </summary>
        private readonly IConfiguration _configuration;

        /// <summary>
        /// The email sender
        /// </summary>
        private readonly IEmailService _emailSender;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController"/> class.
        /// </summary>
        /// <param name="userManager">The user manager.</param>
        /// <param name="roleManager">The role manager.</param>
        /// <param name="signInManager">The sign in manager.</param>
        /// <param name="configuration">The configuration.</param>
        /// <param name="emailSender">The email sender.</param>
        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, Interfaces.IEmailService emailSender)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Login Method for API and Jesse Carlberg Production App
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>Token, Claims, Expiration</returns>
        /// ToDo Convert to Cookie instead of Session Token
        /// <remarks>Login requires Anti_forgery Token</remarks>
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        [HttpPost("login", Name = "Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            // User Manager Finds User in DB
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return Unauthorized();
            }

            // Check if User email addres is confirmed.
            if (user != null && !await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized(new AuthResponse { ErrorMessage = "Email is not confirmed" });
            // Signin Manger validates User Password and Username are correct
            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, true, lockoutOnFailure: true);
            if (result != null && result.Succeeded)
            {
                // Gets a list of User Roles
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                // Creates new JWT Token
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    claims = authClaims,
                    expiration = token.ValidTo
                });
            }

            // If user has locked their account.
            if (result.IsLockedOut)
            {
                string forgotPassLink = "https://jessecarlbergproduction.com/#/forgot-password";
                string content = string.Format(CultureInfo.CurrentCulture, "Your account is locked out, to reset your password, please click this link: {0}", forgotPassLink);

                var message = new EmailModel
                {
                    Message = content,
                    HtmlMessage = content,
                    ToEmail = user.Email,
                    Subject = "Your Jesse Carlberg Production account is locked out"
                };
                await _emailSender.SendEmailAsync(message);

                return Unauthorized(new AuthResponse { ErrorMessage = "Account is locked out." });
            }

            return Unauthorized();
        }

        /// <summary>
        /// Logout User
        /// </summary>
        /// <returns>IActionResult.</returns>
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        /// <summary>
        /// Forgot User Password. Generates email to user.
        /// </summary>
        /// <param name="forgotPasswordModel">The forgot password model.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost("ForgotPassword")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPassword forgotPasswordModel)
        {
            if (forgotPasswordModel is null)
            {
                throw new ArgumentNullException(nameof(forgotPasswordModel));
            }

            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", forgotPasswordModel.Email }
            };

            var callback = QueryHelpers.AddQueryString("", param);
            callback = @"https://jessecarlbergproduction.com/#/reset-password" + callback;

            string emailText = GetEmail("ResetEmailTemplate.txt");
            emailText = emailText.Replace("{{validateLink}}", callback);
            string plainTextEmail = "Reset your Jesse Carlberg Production password.  Click here: " + callback + "  Thank you, Jesse Carlberg Production Team ";

            var message = new EmailModel
            {
                Message = callback,
                HtmlMessage = callback,
                ToEmail = forgotPasswordModel.Email,
                Subject = "Reset your Jesse Carlberg Production password"
            };
            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        /// <summary>
        /// Reset User Password. Generates email to User.
        /// </summary>
        /// <param name="resetPasswordDto">The reset password dto.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost("ResetPassword")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPasswordAsync([FromBody] ResetPassword resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);

                return BadRequest(new { Errors = errors });
            }

            return Ok();
        }

        /// <summary>
        /// User resets own password in App
        /// </summary>
        /// <param name="resetPasswordDto">The reset password dto.</param>
        /// <returns>IActionResult.</returns>
        [Authorize]
        [HttpPost("ResetPasswordApp")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPasswordFromAppAsync([FromBody] ResetPasswordApp resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = _userManager.FindByEmailAsync(resetPasswordDto.Email).GetAwaiter().GetResult();
            if (user == null)
                return BadRequest("Invalid Request");

            var token = _userManager.GeneratePasswordResetTokenAsync(user).GetAwaiter().GetResult();

            var resetPassResult = await _userManager.ResetPasswordAsync(user, token, resetPasswordDto.Password);
            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);

                return BadRequest(new { Errors = errors });
            }

            if (user != null && !await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized(new AuthResponse { ErrorMessage = "Email is not confirmed" });

            var result = await _signInManager.PasswordSignInAsync(user.UserName, resetPasswordDto.Password, true, lockoutOnFailure: true);
            if (result != null && result.Succeeded)
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var jwttoken = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwttoken),
                    expiration = jwttoken.ValidTo
                });
            }

            return Unauthorized();
        }

        /// <summary>
        /// Webhook to confirm e-mail address
        /// </summary>
        /// <param name="email">The email.</param>
        /// <param name="token">The token.</param>
        /// <returns>IActionResult.</returns>
        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmationAsync([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");

            return Ok();
        }

        /// <summary>
        /// LConfirm e-mail address
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost("EmailConfirmation")]
        public async Task<IActionResult> EmailValidationAsync([FromBody] EmailValidation model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await _userManager.ConfirmEmailAsync(user, model.Token);
            if (!confirmResult.Succeeded)
                return BadRequest("Invalid Email Confirmation Request");

            return Ok();
        }

        /// <summary>
        /// Resend user e-mail confirmation to user e-mail
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Route("resend-email-confirmation")]
        public async Task<IActionResult> ResendEmailConfirmationAsync([FromBody] ResendEmailModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user == null)
            {
                return NotFound();
            }
            if (user != null && await _userManager.IsEmailConfirmedAsync(user))
            {
                return Ok(new Response { Status = "Success", Message = "User email already confirmed!" });
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };

            var callback = QueryHelpers.AddQueryString("", param);
            callback = "https://jessecarlbergproduction/#/confirm-email" + callback;
            string emailText = GetEmail("ValidationEmailTemplate.txt");
            emailText = emailText.Replace("{{validateLink}}", callback);
            string plainTextEmail = "Please confirm your email address with Jesse Carlberg Production.  Click here: " + callback + "  Thank you, Jesse Carlberg Production Team ";

            var message = new EmailModel
            {
                Message = plainTextEmail,
                HtmlMessage = emailText,
                ToEmail = model.Email,
                Subject = "Confirm your Jesse Carlberg Production registration"
            };
            SendGrid.Response resp = await _emailSender.SendEmailAsync(message);

            return Ok(resp);
        }

        /// <summary>
        /// Create a new user in the app.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>IActionResult.</returns>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var param = new Dictionary<string, string>
            {
                {"token", token },
                {"email", user.Email }
            };

            var callback = QueryHelpers.AddQueryString("", param);
            callback = "https://jessecarlbergproduction.com/#/confirm-email" + callback;

            string emailText = GetEmail("ValidationEmailTemplate.txt");
            emailText = emailText.Replace("{{validateLink}}", callback);
            string plainTextEmail = "Please confirm your email address with Jesse Carlberg Production.  Click here: " + callback + "  Thank you, Jesse Carlberg Production Team ";

            var message = new EmailModel
            {
                Message = plainTextEmail,
                HtmlMessage = emailText,
                ToEmail = model.Email,
                Subject = "Confirm your Jesse Carlberg Production registration"
            };
            await _emailSender.SendEmailAsync(message);

            await _userManager.AddToRoleAsync(user, "User");

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        /// <summary>
        /// Register a new admin user
        /// </summary>
        /// <param name="model">The model.</param>
        /// <returns>IActionResult.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdminAsync([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Web))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Web));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Photo))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Photo));
            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        /// <summary>
        /// Create a new Role
        /// </summary>
        /// <param name="model">The Role Model. Ha.</param>
        /// <returns>IActionResult.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("roles/create")]
        public IActionResult CreateNewRole([FromBody] RoleModel model)
        {
            Task<IdentityResult> role = _roleManager.CreateAsync(new IdentityRole { Name = model.RoleName });

            return Ok(role);
        }

        /// <summary>
        /// Get List of Roles
        /// </summary>
        /// <returns>IActionResult.</returns>
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("roles")]
        public IActionResult GetRoles()
        {
            var roles = _roleManager.Roles.ToList();
            return Ok(roles);
        }

        /// <summary>
        /// Add a Role to a User
        /// </summary>
        /// <param name="model">User and Role.</param>
        /// <returns>IActionResult.</returns>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("roles/add")]
        public async Task<IActionResult> AddNewRoleToSUserAsync([FromBody] AddUserRoleModel model)
        {
            if (!await _roleManager.RoleExistsAsync(model.RoleName))
            {
                return BadRequest(new Response { Status = "Error", Message = "Role does not exist." });
            }
            IdentityRole role = await _roleManager.FindByNameAsync(model.RoleName);
            ApplicationUser user = await _userManager.FindByNameAsync(model.UserName);
            IdentityResult resp = await _userManager.AddToRoleAsync(user, role.Name);

            return Ok(resp);
        }

        //[Authorize(Roles = "Admin")]
        //[HttpGet("users", Name = "GetAuthUsers")]
        //public async Task<IActionResult> GetAuthUsers()
        //{
        //    var admins = (await _userManager
        //        .GetUsersInRoleAsync("Admin"))
        //        .ToArray();

        //    var everyone = await _userManager.Users
        //        .ToArrayAsync();

        //    var amodel = new ManageUsersViewModel
        //    {
        //        Administrators = admins,
        //        Everyone = everyone
        //    };
        //    return Ok(amodel);
        //}

        /// <summary>
        /// Returns SQL from file.
        /// </summary>
        /// <param name="filename">The filename.</param>
        /// <returns>System.String.</returns>
        private static string GetEmail(string filename)
        {
            string commandText;
            Assembly thisAssembly = Assembly.GetExecutingAssembly();
            using (Stream s = thisAssembly.GetManifestResourceStream(
                  "JesseCarlbergProduction.Resources." + filename))
            {
                using StreamReader sr = new(s);
                commandText = sr.ReadToEnd();
            }

            return commandText;
        }

        #region IDisposable Implementation

        protected bool disposed;

        protected virtual void Dispose(bool disposing)
        {
            lock (this)
            {
                // Do nothing if the object has already been disposed of.
                if (disposed)
                    return;

                if (disposing)
                {
                    // Release disposable objects used by this instance here.

                    if (_userManager != null)
                        _userManager.Dispose();
                    if (_roleManager != null)
                        _roleManager.Dispose();
                }

                // Release unmanaged resources here. Don't access reference type fields.

                // Remember that the object has been disposed of.
                disposed = true;
            }
        }

        public virtual void Dispose()
        {
            Dispose(true);
            // Unregister object for finalization.
            GC.SuppressFinalize(this);
        }

        #endregion IDisposable Implementation
    }
}