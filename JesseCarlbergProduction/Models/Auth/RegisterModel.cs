using System.ComponentModel.DataAnnotations;

namespace JesseCarlbergProduction.Models
{
    /// <summary>
    /// Class RegisterModel.
    /// </summary>
    public class RegisterModel
    {
        /// <summary>
        /// Gets or sets the username.
        /// </summary>
        /// <value>The username.</value>
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        /// <value>The password.</value>
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}