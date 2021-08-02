using System.ComponentModel.DataAnnotations;

namespace JesseCarlbergProduction.Models
{
    /// <summary>
    /// Class ForgotPassword.
    /// </summary>
    public class ForgotPassword
    {
        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        /// <value>The email.</value>
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}